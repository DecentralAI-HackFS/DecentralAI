# -*- coding:utf-8 -*-
from functools import wraps

import flask_login
from flask import request, current_app, session
from flask_restful import Resource, reqparse
from typing import Optional

from extensions.ext_database import db
from models.model import DifySetup
from services.account_service import AccountService, TenantService, RegisterService

from libs.helper import email, str_len
from libs.password import valid_password

from . import api
from .error import AlreadySetupError, NotSetupError
from .wraps import only_edition_self_hosted

import requests
from datetime import datetime, timedelta, timezone
from extensions.ext_database import db
from models.account import Account, AccountStatus
from libs.oauth import OAuthUserInfo

class SetupApi(Resource):

    @only_edition_self_hosted
    def get(self):
        setup_status = get_setup_status()
        if setup_status:
            return {
                'step': 'finished',
                'setup_at': setup_status.setup_at.isoformat()
            }  
        return {'step': 'not_start'}

    @only_edition_self_hosted
    def post(self):
        # is set up
        if get_setup_status():
            raise AlreadySetupError()

        # is tenant created
        tenant_count = TenantService.get_tenant_count()
        if tenant_count > 0:
            raise AlreadySetupError()

        parser = reqparse.RequestParser()
        parser.add_argument('email', type=email,
                            required=True, location='json')
        parser.add_argument('name', type=str_len(
            30), required=True, location='json')
        parser.add_argument('password', type=valid_password,
                            required=True, location='json')
        args = parser.parse_args()

        # Register
        account = RegisterService.register(
            email=args['email'],
            name=args['name'],
            password=args['password']
        )

        setup()

        # Login
        flask_login.login_user(account)
        AccountService.update_last_login(account, request)

        return {'result': 'success'}, 201

class Web3SetupApi(Resource):
    @only_edition_self_hosted
    def post(self):
        # is set up
        if get_setup_status():
            raise AlreadySetupError()

        # is tenant created
        # tenant_count = TenantService.get_tenant_count()
        # if tenant_count > 0:
        #     raise AlreadySetupError()

        parser = reqparse.RequestParser()
        parser.add_argument('message', type=str, required=True, location='json')
        parser.add_argument('signature', type=str, required=True, location='json')
        parser.add_argument('remember_me', type=bool, required=False, default=False, location='json')
        args = parser.parse_args()

        REQUEST_URL = 'https://authapi.moralis.io/challenge/verify/evm'
        x = requests.post(
            REQUEST_URL,
            json={
                'message': args['message'],
                'signature': args['signature'],
                'networkType': 'evm'
            },
            headers={'X-API-KEY': current_app.config['MORALIS_API_KEY']})
        if x.status_code == 201:
            # user can authenticate

            eth_address = x.json()['address']
            print("eth address", eth_address)
            account = _generate_account('web3', OAuthUserInfo(id=eth_address, name=eth_address,
                                                              email=f'{eth_address}@gmail.com'))

            if account.status == AccountStatus.BANNED.value or account.status == AccountStatus.CLOSED.value:
                return {'error': 'Account is banned or closed.'}, 403

            if account.status == AccountStatus.PENDING.value:
                account.status = AccountStatus.ACTIVE.value
                account.initialized_at = datetime.utcnow()

                setup()

                db.session.commit()

            # login user
            session.clear()
            flask_login.login_user(account, remember=args['remember_me'])
            AccountService.update_last_login(account, request)
            return {'result': 'success'}
        else:
            return {'error': 'Invalid signature'}, 401


def setup():
    dify_setup = DifySetup(
        version=current_app.config['CURRENT_VERSION']
    )
    db.session.add(dify_setup)


def setup_required(view):
    @wraps(view)
    def decorated(*args, **kwargs):
        # check setup
        if not get_setup_status():
            raise NotSetupError()

        return view(*args, **kwargs)

    return decorated


def get_setup_status():
    if current_app.config['EDITION'] == 'SELF_HOSTED':
        return DifySetup.query.first()
    else:
        return True

def _get_account_by_openid_or_email(provider: str, user_info: OAuthUserInfo) -> Optional[Account]:
    account = Account.get_by_openid(provider, user_info.id)

    if not account:
        account = Account.query.filter_by(email=user_info.email).first()

    return account


def _generate_account(provider: str, user_info: OAuthUserInfo):
    # Get account by openid or email.
    account = _get_account_by_openid_or_email(provider, user_info)

    if not account:
        # Create account
        account_name = user_info.name if user_info.name else 'Dify'
        account = RegisterService.register(
            email=user_info.email,
            name=account_name,
            password=None,
            open_id=user_info.id,
            provider=provider
        )

        # Set interface language
        preferred_lang = request.accept_languages.best_match(['zh', 'en'])
        if preferred_lang == 'zh':
            interface_language = 'zh-Hans'
        else:
            interface_language = 'en-US'
        account.interface_language = interface_language
        db.session.commit()

    # Link account
    AccountService.link_account_integrate(provider, user_info.id, account)

    return account

api.add_resource(SetupApi, '/setup')
api.add_resource(Web3SetupApi, '/web3/setup')

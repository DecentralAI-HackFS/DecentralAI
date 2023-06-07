# -*- coding:utf-8 -*-
import flask
import flask_login
from flask import request, current_app, session
from flask_restful import Resource, reqparse
from typing import Optional

import services
from controllers.console import api
from controllers.console.error import AccountNotLinkTenantError
from controllers.console.setup import setup_required
from libs.helper import email
from libs.password import valid_password
from services.account_service import AccountService, TenantService
import requests
from datetime import datetime, timedelta, timezone
from extensions.ext_database import db
from models.account import Account, AccountStatus
from services.account_service import AccountService, RegisterService
from libs.oauth import OAuthUserInfo


class LoginApi(Resource):
    """Resource for user login."""

    @setup_required
    def post(self):
        """Authenticate user and login."""
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=email, required=True, location='json')
        parser.add_argument('password', type=valid_password, required=True, location='json')
        parser.add_argument('remember_me', type=bool, required=False, default=False, location='json')
        args = parser.parse_args()

        # todo: Verify the recaptcha

        try:
            account = AccountService.authenticate(args['email'], args['password'])
        except services.errors.account.AccountLoginError:
            return {'code': 'unauthorized', 'message': 'Invalid email or password'}, 401

        try:
            TenantService.switch_tenant(account)
        except Exception:
            raise AccountNotLinkTenantError("Account not link tenant")

        flask_login.login_user(account, remember=args['remember_me'])
        AccountService.update_last_login(account, request)

        # todo: return the user info

        return {'result': 'success'}


class Web3LoginRequestMessageApi(Resource):
    @setup_required
    def post(self):
        """Authenticate user and login."""
        parser = reqparse.RequestParser()
        parser.add_argument('address', type=str, required=True, location='json')
        parser.add_argument('chainId', type=int, required=True, location='json')
        args = parser.parse_args()

        present = datetime.now(timezone.utc)
        present_plus_one_m = present + timedelta(minutes=1)
        expirationTime = str(present_plus_one_m.isoformat())
        expirationTime = str(expirationTime[:-6]) + 'Z'

        REQUEST_URL = 'https://authapi.moralis.io/challenge/request/evm'
        request_object = {
            "domain": "DecentralAI-HackFS",
            "chainId": args['chainId'],
            "address": args['address'],
            "statement": "Please confirm",
            "uri": current_app.config['API_URL'],
            "expirationTime": expirationTime,
            "notBefore": "2020-01-01T00:00:00.000Z",
            "timeout": 15
        }
        res = requests.post(
            REQUEST_URL,
            json=request_object,
            headers={'X-API-KEY': current_app.config['MORALIS_API_KEY']})

        return res.json()


class Web3LoginApi(Resource):
    """Resource for user login."""

    @setup_required
    def post(self):
        """Authenticate user and login."""
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
            account = _generate_account('web3', OAuthUserInfo(id=eth_address, name=eth_address, email=f'{eth_address}@gmail.com'))

            if account.status == AccountStatus.BANNED.value or account.status == AccountStatus.CLOSED.value:
                return {'error': 'Account is banned or closed.'}, 403

            if account.status == AccountStatus.PENDING.value:
                account.status = AccountStatus.ACTIVE.value
                account.initialized_at = datetime.utcnow()
                db.session.commit()

            # login user
            session.clear()
            flask_login.login_user(account, remember=args['remember_me'])
            AccountService.update_last_login(account, request)
            return {'result': 'success'}
        else:
            return {'error': 'Invalid signature'}, 401


class LogoutApi(Resource):

    @setup_required
    def get(self):
        flask.session.pop('workspace_id', None)
        flask_login.logout_user()
        return {'result': 'success'}


class ResetPasswordApi(Resource):
    @setup_required
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('email', type=email, required=True, location='json')
        args = parser.parse_args()

        # import mailchimp_transactional as MailchimpTransactional
        # from mailchimp_transactional.api_client import ApiClientError

        account = {'email': args['email']}
        # account = AccountService.get_by_email(args['email'])
        # if account is None:
        #     raise ValueError('Email not found')
        # new_password = AccountService.generate_password()
        # AccountService.update_password(account, new_password)

        # todo: Send email
        MAILCHIMP_API_KEY = current_app.config['MAILCHIMP_TRANSACTIONAL_API_KEY']
        # mailchimp = MailchimpTransactional(MAILCHIMP_API_KEY)

        message = {
            'from_email': 'noreply@example.com',
            'to': [{'email': account.email}],
            'subject': 'Reset your Dify password',
            'html': """
                <p>Dear User,</p>
                <p>The Dify team has generated a new password for you, details as follows:</p> 
                <p><strong>{new_password}</strong></p>
                <p>Please change your password to log in as soon as possible.</p>
                <p>Regards,</p>
                <p>The Dify Team</p> 
            """
        }

        # response = mailchimp.messages.send({
        #     'message': message,
        #     # required for transactional email
        #     ' settings': {
        #         'sandbox_mode': current_app.config['MAILCHIMP_SANDBOX_MODE'],
        #     },
        # })

        # Check if MSG was sent
        # if response.status_code != 200:
        #     # handle error
        #     pass

        return {'result': 'success'}


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


api.add_resource(Web3LoginRequestMessageApi, '/web3/login/request-message')
api.add_resource(Web3LoginApi, '/web3/login')
api.add_resource(LoginApi, '/login')
api.add_resource(LogoutApi, '/logout')

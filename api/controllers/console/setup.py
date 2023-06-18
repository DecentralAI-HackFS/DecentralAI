# -*- coding:utf-8 -*-
from functools import wraps

import flask_login
from flask import request, current_app
from flask_restful import Resource, reqparse

from extensions.ext_database import db
from models.model import DifySetup
from services.account_service import AccountService, TenantService, RegisterService

from libs.helper import email, str_len
from libs.password import valid_password

from . import api
from .error import AlreadySetupError, NotSetupError
from .wraps import only_edition_self_hosted


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

api.add_resource(SetupApi, '/setup')

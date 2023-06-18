import os
from functools import wraps

from flask import request
from flask_restful import Resource, reqparse
from werkzeug.exceptions import NotFound, Unauthorized

from controllers.console import api
from controllers.console.wraps import only_edition_cloud
from extensions.ext_database import db
from models.model import RecommendedApp, App, InstalledApp


def admin_required(view):
    @wraps(view)
    def decorated(*args, **kwargs):
        if not os.getenv('ADMIN_API_KEY'):
            raise Unauthorized('API key is invalid.')

        auth_header = request.headers.get('Authorization')
        if auth_header is None:
            raise Unauthorized('Authorization header is missing.')

        if ' ' not in auth_header:
            raise Unauthorized('Invalid Authorization header format. Expected \'Bearer <api-key>\' format.')

        auth_scheme, auth_token = auth_header.split(None, 1)
        auth_scheme = auth_scheme.lower()

        if auth_scheme != 'bearer':
            raise Unauthorized('Invalid Authorization header format. Expected \'Bearer <api-key>\' format.')

        if os.getenv('ADMIN_API_KEY') != auth_token:
            raise Unauthorized('API key is invalid.')

        return view(*args, **kwargs)

    return decorated


class InsertExploreAppListApi(Resource):
    @only_edition_cloud
    @admin_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('app_id', type=str, required=True, nullable=False, location='json')
        parser.add_argument('desc', type=str, location='json')
        parser.add_argument('copyright', type=str, location='json')
        parser.add_argument('privacy_policy', type=str, location='json')
        parser.add_argument('language', type=str, required=True, nullable=False, choices=['en-US', 'zh-Hans'],
                            location='json')
        parser.add_argument('category', type=str, required=True, nullable=False, location='json')
        parser.add_argument('position', type=int, required=True, nullable=False, location='json')
        args = parser.parse_args()

        app = App.query.filter(App.id == args['app_id']).first()
        if not app:
            raise NotFound('App not found')

        site = app.site
        if not site:
            desc = args['desc'] if args['desc'] else ''
            copy_right = args['copyright'] if args['copyright'] else ''
            privacy_policy = args['privacy_policy'] if args['privacy_policy'] else ''
        else:
            desc = site.description if (site.description if not args['desc'] else args['desc']) else ''
            copy_right = site.copyright if (site.copyright if not args['copyright'] else args['copyright']) else ''
            privacy_policy = site.privacy_policy \
                if (site.privacy_policy if not args['privacy_policy'] else args['privacy_policy']) else ''

        recommended_app = RecommendedApp.query.filter(RecommendedApp.app_id == args['app_id']).first()

        if not recommended_app:
            recommended_app = RecommendedApp(
                app_id=app.id,
                description=desc,
                copyright=copy_right,
                privacy_policy=privacy_policy,
                language=args['language'],
                category=args['category'],
                position=args['position']
            )

            db.session.add(recommended_app)

            app.is_public = True
            db.session.commit()

            return {'result': 'success'}, 201
        else:
            recommended_app.description = desc
            recommended_app.copyright = copy_right
            recommended_app.privacy_policy = privacy_policy
            recommended_app.language = args['language']
            recommended_app.category = args['category']
            recommended_app.position = args['position']

            app.is_public = True

            db.session.commit()

            return {'result': 'success'}, 200


class InsertExploreAppApi(Resource):
    @only_edition_cloud
    @admin_required
    def delete(self, app_id):
        recommended_app = RecommendedApp.query.filter(RecommendedApp.app_id == str(app_id)).first()
        if not recommended_app:
            return {'result': 'success'}, 204

        app = App.query.filter(App.id == recommended_app.app_id).first()
        if app:
            app.is_public = False

        installed_apps = InstalledApp.query.filter(
            InstalledApp.app_id == recommended_app.app_id,
            InstalledApp.tenant_id != InstalledApp.app_owner_tenant_id
        ).all()

        for installed_app in installed_apps:
            db.session.delete(installed_app)

        db.session.delete(recommended_app)
        db.session.commit()

        return {'result': 'success'}, 204


api.add_resource(InsertExploreAppListApi, '/admin/insert-explore-apps')
api.add_resource(InsertExploreAppApi, '/admin/insert-explore-apps/<uuid:app_id>')

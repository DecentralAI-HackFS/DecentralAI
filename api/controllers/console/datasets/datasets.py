# -*- coding:utf-8 -*-
from flask import request
from flask_login import login_required, current_user
from flask_restful import Resource, reqparse, fields, marshal, marshal_with
from werkzeug.exceptions import NotFound, Forbidden

import services
from controllers.console import api
from controllers.console.datasets.error import DatasetNameDuplicateError
from controllers.console.setup import setup_required
from controllers.console.wraps import account_initialization_required
from core.indexing_runner import IndexingRunner
from libs.helper import TimestampField
from extensions.ext_database import db
from models.model import UploadFile
from services.dataset_service import DatasetService

dataset_detail_fields = {
    'id': fields.String,
    'name': fields.String,
    'description': fields.String,
    'provider': fields.String,
    'permission': fields.String,
    'data_source_type': fields.String,
    'indexing_technique': fields.String,
    'app_count': fields.Integer,
    'document_count': fields.Integer,
    'word_count': fields.Integer,
    'created_by': fields.String,
    'created_at': TimestampField,
    'updated_by': fields.String,
    'updated_at': TimestampField,
}

dataset_query_detail_fields = {
    "id": fields.String,
    "content": fields.String,
    "source": fields.String,
    "source_app_id": fields.String,
    "created_by_role": fields.String,
    "created_by": fields.String,
    "created_at": TimestampField
}


def _validate_name(name):
    if not name or len(name) < 1 or len(name) > 40:
        raise ValueError('Name must be between 1 to 40 characters.')
    return name


def _validate_description_length(description):
    if len(description) > 200:
        raise ValueError('Description cannot exceed 200 characters.')
    return description


class DatasetListApi(Resource):

    @setup_required
    @login_required
    @account_initialization_required
    def get(self):
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=20, type=int)
        ids = request.args.getlist('ids')
        provider = request.args.get('provider', default="vendor")
        if ids:
            datasets, total = DatasetService.get_datasets_by_ids(ids, current_user.current_tenant_id)
        else:
            datasets, total = DatasetService.get_datasets(page, limit, provider,
                                                          current_user.current_tenant_id, current_user)

        response = {
            'data': marshal(datasets, dataset_detail_fields),
            'has_more': len(datasets) == limit,
            'limit': limit,
            'total': total,
            'page': page
        }
        return response, 200

    @setup_required
    @login_required
    @account_initialization_required
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', nullable=False, required=True,
                            help='type is required. Name must be between 1 to 40 characters.',
                            type=_validate_name)
        parser.add_argument('indexing_technique', type=str, location='json',
                            choices=('high_quality', 'economy'),
                            help='Invalid indexing technique.')
        args = parser.parse_args()

        # The role of the current user in the ta table must be admin or owner
        if current_user.current_tenant.current_role not in ['admin', 'owner']:
            raise Forbidden()

        try:
            dataset = DatasetService.create_empty_dataset(
                tenant_id=current_user.current_tenant_id,
                name=args['name'],
                indexing_technique=args['indexing_technique'],
                account=current_user
            )
        except services.errors.dataset.DatasetNameDuplicateError:
            raise DatasetNameDuplicateError()

        return marshal(dataset, dataset_detail_fields), 201


class DatasetApi(Resource):
    @setup_required
    @login_required
    @account_initialization_required
    def get(self, dataset_id):
        dataset_id_str = str(dataset_id)
        dataset = DatasetService.get_dataset(dataset_id_str)
        if dataset is None:
            raise NotFound("Dataset not found.")

        try:
            DatasetService.check_dataset_permission(
                dataset, current_user)
        except services.errors.account.NoPermissionError as e:
            raise Forbidden(str(e))

        return marshal(dataset, dataset_detail_fields), 200

    @setup_required
    @login_required
    @account_initialization_required
    def patch(self, dataset_id):
        dataset_id_str = str(dataset_id)

        parser = reqparse.RequestParser()
        parser.add_argument('name', nullable=False,
                            help='type is required. Name must be between 1 to 40 characters.',
                            type=_validate_name)
        parser.add_argument('description',
                            location='json', store_missing=False,
                            type=_validate_description_length)
        parser.add_argument('indexing_technique', type=str, location='json',
                            choices=('high_quality', 'economy'),
                            help='Invalid indexing technique.')
        parser.add_argument('permission', type=str, location='json', choices=(
            'only_me', 'all_team_members'), help='Invalid permission.')
        args = parser.parse_args()

        # The role of the current user in the ta table must be admin or owner
        if current_user.current_tenant.current_role not in ['admin', 'owner']:
            raise Forbidden()

        dataset = DatasetService.update_dataset(
            dataset_id_str, args, current_user)

        if dataset is None:
            raise NotFound("Dataset not found.")

        return marshal(dataset, dataset_detail_fields), 200

    @setup_required
    @login_required
    @account_initialization_required
    def delete(self, dataset_id):
        dataset_id_str = str(dataset_id)

        # The role of the current user in the ta table must be admin or owner
        if current_user.current_tenant.current_role not in ['admin', 'owner']:
            raise Forbidden()

        if DatasetService.delete_dataset(dataset_id_str, current_user):
            return {'result': 'success'}, 204
        else:
            raise NotFound("Dataset not found.")


class DatasetQueryApi(Resource):

    @setup_required
    @login_required
    @account_initialization_required
    def get(self, dataset_id):
        dataset_id_str = str(dataset_id)
        dataset = DatasetService.get_dataset(dataset_id_str)
        if dataset is None:
            raise NotFound("Dataset not found.")

        try:
            DatasetService.check_dataset_permission(dataset, current_user)
        except services.errors.account.NoPermissionError as e:
            raise Forbidden(str(e))

        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=20, type=int)

        dataset_queries, total = DatasetService.get_dataset_queries(
            dataset_id=dataset.id,
            page=page,
            per_page=limit
        )

        response = {
            'data': marshal(dataset_queries, dataset_query_detail_fields),
            'has_more': len(dataset_queries) == limit,
            'limit': limit,
            'total': total,
            'page': page
        }
        return response, 200


class DatasetIndexingEstimateApi(Resource):

    @setup_required
    @login_required
    @account_initialization_required
    def post(self):
        segment_rule = request.get_json()
        file_detail = db.session.query(UploadFile).filter(
            UploadFile.tenant_id == current_user.current_tenant_id,
            UploadFile.id == segment_rule["file_id"]
        ).first()

        if file_detail is None:
            raise NotFound("File not found.")

        indexing_runner = IndexingRunner()
        response = indexing_runner.indexing_estimate(file_detail, segment_rule['process_rule'])
        return response, 200


class DatasetRelatedAppListApi(Resource):
    app_detail_kernel_fields = {
        'id': fields.String,
        'name': fields.String,
        'mode': fields.String,
        'icon': fields.String,
        'icon_background': fields.String,
    }

    related_app_list = {
        'data': fields.List(fields.Nested(app_detail_kernel_fields)),
        'total': fields.Integer,
    }

    @setup_required
    @login_required
    @account_initialization_required
    @marshal_with(related_app_list)
    def get(self, dataset_id):
        dataset_id_str = str(dataset_id)
        dataset = DatasetService.get_dataset(dataset_id_str)
        if dataset is None:
            raise NotFound("Dataset not found.")

        try:
            DatasetService.check_dataset_permission(dataset, current_user)
        except services.errors.account.NoPermissionError as e:
            raise Forbidden(str(e))

        app_dataset_joins = DatasetService.get_related_apps(dataset.id)

        related_apps = []
        for app_dataset_join in app_dataset_joins:
            app_model = app_dataset_join.app
            if app_model:
                related_apps.append(app_model)

        return {
            'data': related_apps,
            'total': len(related_apps)
        }, 200


api.add_resource(DatasetListApi, '/datasets')
api.add_resource(DatasetApi, '/datasets/<uuid:dataset_id>')
api.add_resource(DatasetQueryApi, '/datasets/<uuid:dataset_id>/queries')
api.add_resource(DatasetIndexingEstimateApi, '/datasets/file-indexing-estimate')
api.add_resource(DatasetRelatedAppListApi, '/datasets/<uuid:dataset_id>/related-apps')

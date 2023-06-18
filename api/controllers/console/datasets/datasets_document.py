# -*- coding:utf-8 -*-
import random
from datetime import datetime

from flask import request
from flask_login import login_required, current_user
from flask_restful import Resource, fields, marshal, marshal_with, reqparse
from sqlalchemy import desc, asc
from werkzeug.exceptions import NotFound, Forbidden

import services
from controllers.console import api
from controllers.console.app.error import ProviderNotInitializeError, ProviderQuotaExceededError, \
    ProviderModelCurrentlyNotSupportError
from controllers.console.datasets.error import DocumentAlreadyFinishedError, InvalidActionError, DocumentIndexingError, \
    InvalidMetadataError, ArchivedDocumentImmutableError
from controllers.console.setup import setup_required
from controllers.console.wraps import account_initialization_required
from core.indexing_runner import IndexingRunner
from core.llm.error import ProviderTokenNotInitError, QuotaExceededError, ModelCurrentlyNotSupportError
from extensions.ext_redis import redis_client
from libs.helper import TimestampField
from extensions.ext_database import db
from models.dataset import DatasetProcessRule, Dataset
from models.dataset import Document, DocumentSegment
from models.model import UploadFile
from services.dataset_service import DocumentService, DatasetService
from tasks.add_document_to_index_task import add_document_to_index_task
from tasks.remove_document_from_index_task import remove_document_from_index_task

dataset_fields = {
    'id': fields.String,
    'name': fields.String,
    'description': fields.String,
    'permission': fields.String,
    'data_source_type': fields.String,
    'indexing_technique': fields.String,
    'created_by': fields.String,
    'created_at': TimestampField,
}

document_fields = {
    'id': fields.String,
    'position': fields.Integer,
    'data_source_type': fields.String,
    'data_source_info': fields.Raw(attribute='data_source_info_dict'),
    'dataset_process_rule_id': fields.String,
    'name': fields.String,
    'created_from': fields.String,
    'created_by': fields.String,
    'created_at': TimestampField,
    'tokens': fields.Integer,
    'indexing_status': fields.String,
    'error': fields.String,
    'enabled': fields.Boolean,
    'disabled_at': TimestampField,
    'disabled_by': fields.String,
    'archived': fields.Boolean,
    'display_status': fields.String,
    'word_count': fields.Integer,
    'hit_count': fields.Integer,
}


class DocumentResource(Resource):
    def get_document(self, dataset_id: str, document_id: str) -> Document:
        dataset = DatasetService.get_dataset(dataset_id)
        if not dataset:
            raise NotFound('Dataset not found.')

        try:
            DatasetService.check_dataset_permission(dataset, current_user)
        except services.errors.account.NoPermissionError as e:
            raise Forbidden(str(e))

        document = DocumentService.get_document(dataset_id, document_id)

        if not document:
            raise NotFound('Document not found.')

        if document.tenant_id != current_user.current_tenant_id:
            raise Forbidden('No permission.')

        return document


class GetProcessRuleApi(Resource):
    @setup_required
    @login_required
    @account_initialization_required
    def get(self):
        req_data = request.args

        document_id = req_data.get('document_id')
        if document_id:
            # get the latest process rule
            document = Document.query.get_or_404(document_id)

            dataset = DatasetService.get_dataset(document.dataset_id)

            if not dataset:
                raise NotFound('Dataset not found.')

            try:
                DatasetService.check_dataset_permission(dataset, current_user)
            except services.errors.account.NoPermissionError as e:
                raise Forbidden(str(e))

            # get the latest process rule
            dataset_process_rule = db.session.query(DatasetProcessRule). \
                filter(DatasetProcessRule.dataset_id == document.dataset_id). \
                order_by(DatasetProcessRule.created_at.desc()). \
                limit(1). \
                one_or_none()
            mode = dataset_process_rule.mode
            rules = dataset_process_rule.rules_dict
        else:
            mode = DocumentService.DEFAULT_RULES['mode']
            rules = DocumentService.DEFAULT_RULES['rules']

        return {
            'mode': mode,
            'rules': rules
        }


class DatasetDocumentListApi(Resource):
    @setup_required
    @login_required
    @account_initialization_required
    def get(self, dataset_id):
        dataset_id = str(dataset_id)
        page = request.args.get('page', default=1, type=int)
        limit = request.args.get('limit', default=20, type=int)
        search = request.args.get('search', default=None, type=str)
        sort = request.args.get('sort', default='-created_at', type=str)

        dataset = DatasetService.get_dataset(dataset_id)
        if not dataset:
            raise NotFound('Dataset not found.')

        try:
            DatasetService.check_dataset_permission(dataset, current_user)
        except services.errors.account.NoPermissionError as e:
            raise Forbidden(str(e))

        query = Document.query.filter_by(
            dataset_id=str(dataset_id), tenant_id=current_user.current_tenant_id)

        if search:
            search = f'%{search}%'
            query = query.filter(Document.name.like(search))

        if sort.startswith('-'):
            sort_logic = desc
            sort = sort[1:]
        else:
            sort_logic = asc

        if sort == 'hit_count':
            sub_query = db.select(DocumentSegment.document_id,
                                  db.func.sum(DocumentSegment.hit_count).label("total_hit_count")) \
                .group_by(DocumentSegment.document_id) \
                .subquery()

            query = query.outerjoin(sub_query, sub_query.c.document_id == Document.id) \
                .order_by(sort_logic(db.func.coalesce(sub_query.c.total_hit_count, 0)))
        elif sort == 'created_at':
            query = query.order_by(sort_logic(Document.created_at))
        else:
            query = query.order_by(desc(Document.created_at))

        paginated_documents = query.paginate(
            page=page, per_page=limit, max_per_page=100, error_out=False)
        documents = paginated_documents.items

        response = {
            'data': marshal(documents, document_fields),
            'has_more': len(documents) == limit,
            'limit': limit,
            'total': paginated_documents.total,
            'page': page
        }

        return response

    @setup_required
    @login_required
    @account_initialization_required
    @marshal_with(document_fields)
    def post(self, dataset_id):
        dataset_id = str(dataset_id)

        dataset = DatasetService.get_dataset(dataset_id)

        if not dataset:
            raise NotFound('Dataset not found.')

        # The role of the current user in the ta table must be admin or owner
        if current_user.current_tenant.current_role not in ['admin', 'owner']:
            raise Forbidden()

        try:
            DatasetService.check_dataset_permission(dataset, current_user)
        except services.errors.account.NoPermissionError as e:
            raise Forbidden(str(e))

        parser = reqparse.RequestParser()
        parser.add_argument('indexing_technique', type=str, choices=Dataset.INDEXING_TECHNIQUE_LIST, nullable=False,
                            location='json')
        parser.add_argument('data_source', type=dict, required=True, nullable=True, location='json')
        parser.add_argument('process_rule', type=dict, required=True, nullable=True, location='json')
        parser.add_argument('duplicate', type=bool, nullable=False, location='json')
        args = parser.parse_args()

        if not dataset.indexing_technique and not args['indexing_technique']:
            raise ValueError('indexing_technique is required.')

        # validate args
        DocumentService.document_create_args_validate(args)

        try:
            document = DocumentService.save_document_with_dataset_id(dataset, args, current_user)
        except ProviderTokenNotInitError:
            raise ProviderNotInitializeError()
        except QuotaExceededError:
            raise ProviderQuotaExceededError()
        except ModelCurrentlyNotSupportError:
            raise ProviderModelCurrentlyNotSupportError()

        return document


class DatasetInitApi(Resource):
    dataset_and_document_fields = {
        'dataset': fields.Nested(dataset_fields),
        'document': fields.Nested(document_fields)
    }

    @setup_required
    @login_required
    @account_initialization_required
    @marshal_with(dataset_and_document_fields)
    def post(self):
        # The role of the current user in the ta table must be admin or owner
        if current_user.current_tenant.current_role not in ['admin', 'owner']:
            raise Forbidden()

        parser = reqparse.RequestParser()
        parser.add_argument('indexing_technique', type=str, choices=Dataset.INDEXING_TECHNIQUE_LIST, required=True,
                            nullable=False, location='json')
        parser.add_argument('data_source', type=dict, required=True, nullable=True, location='json')
        parser.add_argument('process_rule', type=dict, required=True, nullable=True, location='json')
        args = parser.parse_args()

        # validate args
        DocumentService.document_create_args_validate(args)

        try:
            dataset, document = DocumentService.save_document_without_dataset_id(
                tenant_id=current_user.current_tenant_id,
                document_data=args,
                account=current_user
            )
        except ProviderTokenNotInitError:
            raise ProviderNotInitializeError()
        except QuotaExceededError:
            raise ProviderQuotaExceededError()
        except ModelCurrentlyNotSupportError:
            raise ProviderModelCurrentlyNotSupportError()

        response = {
            'dataset': dataset,
            'document': document
        }

        return response


class DocumentIndexingEstimateApi(DocumentResource):

    @setup_required
    @login_required
    @account_initialization_required
    def get(self, dataset_id, document_id):
        dataset_id = str(dataset_id)
        document_id = str(document_id)
        document = self.get_document(dataset_id, document_id)

        if document.indexing_status in ['completed', 'error']:
            raise DocumentAlreadyFinishedError()

        data_process_rule = document.dataset_process_rule
        data_process_rule_dict = data_process_rule.to_dict()

        response = {
            "tokens": 0,
            "total_price": 0,
            "currency": "USD",
            "total_segments": 0,
            "preview": []
        }

        if document.data_source_type == 'upload_file':
            data_source_info = document.data_source_info_dict
            if data_source_info and 'upload_file_id' in data_source_info:
                file_id = data_source_info['upload_file_id']

                file = db.session.query(UploadFile).filter(
                    UploadFile.tenant_id == document.tenant_id,
                    UploadFile.id == file_id
                ).first()

                # raise error if file not found
                if not file:
                    raise NotFound('File not found.')

                indexing_runner = IndexingRunner()
                response = indexing_runner.indexing_estimate(file, data_process_rule_dict)

        return response


class DocumentIndexingStatusApi(DocumentResource):
    document_status_fields = {
        'id': fields.String,
        'indexing_status': fields.String,
        'processing_started_at': TimestampField,
        'parsing_completed_at': TimestampField,
        'cleaning_completed_at': TimestampField,
        'splitting_completed_at': TimestampField,
        'completed_at': TimestampField,
        'paused_at': TimestampField,
        'error': fields.String,
        'stopped_at': TimestampField,
        'completed_segments': fields.Integer,
        'total_segments': fields.Integer,
    }

    @setup_required
    @login_required
    @account_initialization_required
    def get(self, dataset_id, document_id):
        dataset_id = str(dataset_id)
        document_id = str(document_id)
        document = self.get_document(dataset_id, document_id)

        completed_segments = DocumentSegment.query \
            .filter(DocumentSegment.completed_at.isnot(None),
                    DocumentSegment.document_id == str(document_id)) \
            .count()
        total_segments = DocumentSegment.query \
            .filter_by(document_id=str(document_id)) \
            .count()

        document.completed_segments = completed_segments
        document.total_segments = total_segments

        return marshal(document, self.document_status_fields)


class DocumentDetailApi(DocumentResource):
    METADATA_CHOICES = {'all', 'only', 'without'}

    @setup_required
    @login_required
    @account_initialization_required
    def get(self, dataset_id, document_id):
        dataset_id = str(dataset_id)
        document_id = str(document_id)
        document = self.get_document(dataset_id, document_id)

        metadata = request.args.get('metadata', 'all')
        if metadata not in self.METADATA_CHOICES:
            raise InvalidMetadataError(f'Invalid metadata value: {metadata}')

        if metadata == 'only':
            response = {
                'id': document.id,
                'doc_type': document.doc_type,
                'doc_metadata': document.doc_metadata
            }
        elif metadata == 'without':
            process_rules = DatasetService.get_process_rules(dataset_id)
            data_source_info = document.data_source_detail_dict
            response = {
                'id': document.id,
                'position': document.position,
                'data_source_type': document.data_source_type,
                'data_source_info': data_source_info,
                'dataset_process_rule_id': document.dataset_process_rule_id,
                'dataset_process_rule': process_rules,
                'name': document.name,
                'created_from': document.created_from,
                'created_by': document.created_by,
                'created_at': document.created_at.timestamp(),
                'tokens': document.tokens,
                'indexing_status': document.indexing_status,
                'completed_at': int(document.completed_at.timestamp()) if document.completed_at else None,
                'updated_at': int(document.updated_at.timestamp()) if document.updated_at else None,
                'indexing_latency': document.indexing_latency,
                'error': document.error,
                'enabled': document.enabled,
                'disabled_at': int(document.disabled_at.timestamp()) if document.disabled_at else None,
                'disabled_by': document.disabled_by,
                'archived': document.archived,
                'segment_count': document.segment_count,
                'average_segment_length':   document.average_segment_length,
                'hit_count': document.hit_count,
                'display_status': document.display_status
            }
        else:
            process_rules = DatasetService.get_process_rules(dataset_id)
            data_source_info = document.data_source_detail_dict_()
            response = {
                'id': document.id,
                'position': document.position,
                'data_source_type': document.data_source_type,
                'data_source_info': data_source_info,
                'dataset_process_rule_id': document.dataset_process_rule_id,
                'dataset_process_rule': process_rules,
                'name': document.name,
                'created_from': document.created_from,
                'created_by': document.created_by,
                'created_at': document.created_at.timestamp(),
                'tokens': document.tokens,
                'indexing_status': document.indexing_status,
                'completed_at': int(document.completed_at.timestamp())if document.completed_at else None,
                'updated_at': int(document.updated_at.timestamp()) if document.updated_at else None,
                'indexing_latency': document.indexing_latency,
                'error': document.error,
                'enabled': document.enabled,
                'disabled_at': int(document.disabled_at.timestamp()) if document.disabled_at else None,
                'disabled_by': document.disabled_by,
                'archived': document.archived,
                'doc_type': document.doc_type,
                'doc_metadata': document.doc_metadata,
                'segment_count': document.segment_count,
                'average_segment_length': document.average_segment_length,
                'hit_count': document.hit_count,
                'display_status': document.display_status
            }

        return response, 200


class DocumentProcessingApi(DocumentResource):
    @setup_required
    @login_required
    @account_initialization_required
    def patch(self, dataset_id, document_id, action):
        dataset_id = str(dataset_id)
        document_id = str(document_id)
        document = self.get_document(dataset_id, document_id)

        # The role of the current user in the ta table must be admin or owner
        if current_user.current_tenant.current_role not in ['admin', 'owner']:
            raise Forbidden()

        if action == "pause":
            if document.indexing_status != "indexing":
                raise InvalidActionError('Document not in indexing state.')

            document.paused_by = current_user.id
            document.paused_at = datetime.utcnow()
            document.is_paused = True
            db.session.commit()

        elif action == "resume":
            if document.indexing_status not in ["paused", "error"]:
                raise InvalidActionError('Document not in paused or error state.')

            document.paused_by = None
            document.paused_at = None
            document.is_paused = False
            db.session.commit()
        else:
            raise InvalidActionError()

        return {'result': 'success'}, 200


class DocumentDeleteApi(DocumentResource):
    @setup_required
    @login_required
    @account_initialization_required
    def delete(self, dataset_id, document_id):
        dataset_id = str(dataset_id)
        document_id = str(document_id)
        document = self.get_document(dataset_id, document_id)

        try:
            DocumentService.delete_document(document)
        except services.errors.document.DocumentIndexingError:
            raise DocumentIndexingError('Cannot delete document during indexing.')

        return {'result': 'success'}, 204


class DocumentMetadataApi(DocumentResource):
    @setup_required
    @login_required
    @account_initialization_required
    def put(self, dataset_id, document_id):
        dataset_id = str(dataset_id)
        document_id = str(document_id)
        document = self.get_document(dataset_id, document_id)

        req_data = request.get_json()

        doc_type = req_data.get('doc_type')
        doc_metadata = req_data.get('doc_metadata')

        # The role of the current user in the ta table must be admin or owner
        if current_user.current_tenant.current_role not in ['admin', 'owner']:
            raise Forbidden()

        if doc_type is None or doc_metadata is None:
            raise ValueError('Both doc_type and doc_metadata must be provided.')

        if doc_type not in DocumentService.DOCUMENT_METADATA_SCHEMA:
            raise ValueError('Invalid doc_type.')

        if not isinstance(doc_metadata, dict):
            raise ValueError('doc_metadata must be a dictionary.')

        metadata_schema = DocumentService.DOCUMENT_METADATA_SCHEMA[doc_type]

        document.doc_metadata = {}

        for key, value_type in metadata_schema.items():
            value = doc_metadata.get(key)
            if value is not None and isinstance(value, value_type):
                document.doc_metadata[key] = value

        document.doc_type = doc_type
        document.updated_at = datetime.utcnow()
        db.session.commit()

        return {'result': 'success', 'message': 'Document metadata updated.'}, 200


class DocumentStatusApi(DocumentResource):
    @setup_required
    @login_required
    @account_initialization_required
    def patch(self, dataset_id, document_id, action):
        dataset_id = str(dataset_id)
        document_id = str(document_id)
        document = self.get_document(dataset_id, document_id)

        # The role of the current user in the ta table must be admin or owner
        if current_user.current_tenant.current_role not in ['admin', 'owner']:
            raise Forbidden()

        indexing_cache_key = 'document_{}_indexing'.format(document.id)
        cache_result = redis_client.get(indexing_cache_key)
        if cache_result is not None:
            raise InvalidActionError("Document is being indexed, please try again later")

        if action == "enable":
            if document.enabled:
                raise InvalidActionError('Document already enabled.')

            document.enabled = True
            document.disabled_at = None
            document.disabled_by = None
            document.updated_at = datetime.utcnow()
            db.session.commit()

            # Set cache to prevent indexing the same document multiple times
            redis_client.setex(indexing_cache_key, 600, 1)

            add_document_to_index_task.delay(document_id)

            return {'result': 'success'}, 200

        elif action == "disable":
            if not document.enabled:
                raise InvalidActionError('Document already disabled.')

            document.enabled = False
            document.disabled_at = datetime.utcnow()
            document.disabled_by = current_user.id
            document.updated_at = datetime.utcnow()
            db.session.commit()

            # Set cache to prevent indexing the same document multiple times
            redis_client.setex(indexing_cache_key, 600, 1)

            remove_document_from_index_task.delay(document_id)

            return {'result': 'success'}, 200

        elif action == "archive":
            if document.archived:
                raise InvalidActionError('Document already archived.')

            document.archived = True
            document.archived_at = datetime.utcnow()
            document.archived_by = current_user.id
            document.updated_at = datetime.utcnow()
            db.session.commit()

            if document.enabled:
                # Set cache to prevent indexing the same document multiple times
                redis_client.setex(indexing_cache_key, 600, 1)

                remove_document_from_index_task.delay(document_id)

            return {'result': 'success'}, 200
        else:
            raise InvalidActionError()


class DocumentPauseApi(DocumentResource):
    def patch(self, dataset_id, document_id):
        """pause document."""
        dataset_id = str(dataset_id)
        document_id = str(document_id)

        dataset = DatasetService.get_dataset(dataset_id)
        if not dataset:
            raise NotFound('Dataset not found.')

        document = DocumentService.get_document(dataset.id, document_id)

        # 404 if document not found
        if document is None:
            raise NotFound("Document Not Exists.")

        # 403 if document is archived
        if DocumentService.check_archived(document):
            raise ArchivedDocumentImmutableError()

        try:
            # pause document
            DocumentService.pause_document(document)
        except services.errors.document.DocumentIndexingError:
            raise DocumentIndexingError('Cannot pause completed document.')

        return {'result': 'success'}, 204


class DocumentRecoverApi(DocumentResource):
    def patch(self, dataset_id, document_id):
        """recover document."""
        dataset_id = str(dataset_id)
        document_id = str(document_id)
        dataset = DatasetService.get_dataset(dataset_id)
        if not dataset:
            raise NotFound('Dataset not found.')
        document = DocumentService.get_document(dataset.id, document_id)

        # 404 if document not found
        if document is None:
            raise NotFound("Document Not Exists.")

        # 403 if document is archived
        if DocumentService.check_archived(document):
            raise ArchivedDocumentImmutableError()
        try:
            # pause document
            DocumentService.recover_document(document)
        except services.errors.document.DocumentIndexingError:
            raise DocumentIndexingError('Document is not in paused status.')

        return {'result': 'success'}, 204


api.add_resource(GetProcessRuleApi, '/datasets/process-rule')
api.add_resource(DatasetDocumentListApi,
                 '/datasets/<uuid:dataset_id>/documents')
api.add_resource(DatasetInitApi,
                 '/datasets/init')
api.add_resource(DocumentIndexingEstimateApi,
                 '/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/indexing-estimate')
api.add_resource(DocumentIndexingStatusApi,
                 '/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/indexing-status')
api.add_resource(DocumentDetailApi,
                 '/datasets/<uuid:dataset_id>/documents/<uuid:document_id>')
api.add_resource(DocumentProcessingApi,
                 '/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/processing/<string:action>')
api.add_resource(DocumentDeleteApi,
                 '/datasets/<uuid:dataset_id>/documents/<uuid:document_id>')
api.add_resource(DocumentMetadataApi,
                 '/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/metadata')
api.add_resource(DocumentStatusApi,
                 '/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/status/<string:action>')
api.add_resource(DocumentPauseApi, '/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/processing/pause')
api.add_resource(DocumentRecoverApi, '/datasets/<uuid:dataset_id>/documents/<uuid:document_id>/processing/resume')

# -*- coding:utf-8 -*-
from flask_restful import fields, reqparse, marshal_with
from flask_restful.inputs import int_range
from werkzeug.exceptions import NotFound

from controllers.web import api
from controllers.web.error import NotChatAppError
from controllers.web.wraps import WebApiResource
from libs.helper import TimestampField, uuid_value
from services.conversation_service import ConversationService
from services.errors.conversation import LastConversationNotExistsError, ConversationNotExistsError
from services.web_conversation_service import WebConversationService

conversation_fields = {
    'id': fields.String,
    'name': fields.String,
    'inputs': fields.Raw,
    'status': fields.String,
    'introduction': fields.String,
    'created_at': TimestampField
}

conversation_infinite_scroll_pagination_fields = {
    'limit': fields.Integer,
    'has_more': fields.Boolean,
    'data': fields.List(fields.Nested(conversation_fields))
}


class ConversationListApi(WebApiResource):

    @marshal_with(conversation_infinite_scroll_pagination_fields)
    def get(self, app_model, end_user):
        if app_model.mode != 'chat':
            raise NotChatAppError()

        parser = reqparse.RequestParser()
        parser.add_argument('last_id', type=uuid_value, location='args')
        parser.add_argument('limit', type=int_range(1, 100), required=False, default=20, location='args')
        parser.add_argument('pinned', type=str, choices=['true', 'false', None], location='args')
        args = parser.parse_args()

        pinned = None
        if 'pinned' in args and args['pinned'] is not None:
            pinned = True if args['pinned'] == 'true' else False

        try:
            return WebConversationService.pagination_by_last_id(
                app_model=app_model,
                user=end_user,
                last_id=args['last_id'],
                limit=args['limit'],
                pinned=pinned
            )
        except LastConversationNotExistsError:
            raise NotFound("Last Conversation Not Exists.")


class ConversationApi(WebApiResource):
    def delete(self, app_model, end_user, c_id):
        if app_model.mode != 'chat':
            raise NotChatAppError()

        conversation_id = str(c_id)
        ConversationService.delete(app_model, conversation_id, end_user)
        WebConversationService.unpin(app_model, conversation_id, end_user)

        return {"result": "success"}, 204


class ConversationRenameApi(WebApiResource):

    @marshal_with(conversation_fields)
    def post(self, app_model, end_user, c_id):
        if app_model.mode != 'chat':
            raise NotChatAppError()

        conversation_id = str(c_id)

        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True, location='json')
        args = parser.parse_args()

        try:
            return ConversationService.rename(app_model, conversation_id, end_user, args['name'])
        except ConversationNotExistsError:
            raise NotFound("Conversation Not Exists.")


class ConversationPinApi(WebApiResource):

    def patch(self, app_model, end_user, c_id):
        if app_model.mode != 'chat':
            raise NotChatAppError()

        conversation_id = str(c_id)

        try:
            WebConversationService.pin(app_model, conversation_id, end_user)
        except ConversationNotExistsError:
            raise NotFound("Conversation Not Exists.")

        return {"result": "success"}


class ConversationUnPinApi(WebApiResource):
    def patch(self, app_model, end_user, c_id):
        if app_model.mode != 'chat':
            raise NotChatAppError()

        conversation_id = str(c_id)
        WebConversationService.unpin(app_model, conversation_id, end_user)

        return {"result": "success"}


api.add_resource(ConversationRenameApi, '/conversations/<uuid:c_id>/name', endpoint='web_conversation_name')
api.add_resource(ConversationListApi, '/conversations')
api.add_resource(ConversationApi, '/conversations/<uuid:c_id>')
api.add_resource(ConversationPinApi, '/conversations/<uuid:c_id>/pin')
api.add_resource(ConversationUnPinApi, '/conversations/<uuid:c_id>/unpin')

# -*- coding:utf-8 -*-
from libs.exception import BaseHTTPException


class AppUnavailableError(BaseHTTPException):
    error_code = 'app_unavailable'
    description = "App unavailable, please check your app configurations."
    code = 400


class NotCompletionAppError(BaseHTTPException):
    error_code = 'not_completion_app'
    description = "Please check if your Completion app mode matches the right API route."
    code = 400


class NotChatAppError(BaseHTTPException):
    error_code = 'not_chat_app'
    description = "Please check if your Chat app mode matches the right API route."
    code = 400


class ConversationCompletedError(BaseHTTPException):
    error_code = 'conversation_completed'
    description = "The conversation has ended. Please start a new conversation."
    code = 400


class ProviderNotInitializeError(BaseHTTPException):
    error_code = 'provider_not_initialize'
    description = "No valid model provider credentials found. " \
                  "Please go to Settings -> Model Provider to complete your provider credentials."
    code = 400


class ProviderQuotaExceededError(BaseHTTPException):
    error_code = 'provider_quota_exceeded'
    description = "Your quota for Dify Hosted OpenAI has been exhausted. " \
                  "Please go to Settings -> Model Provider to complete your own provider credentials."
    code = 400


class ProviderModelCurrentlyNotSupportError(BaseHTTPException):
    error_code = 'model_currently_not_support'
    description = "Dify Hosted OpenAI trial currently not support the GPT-4 model."
    code = 400


class CompletionRequestError(BaseHTTPException):
    error_code = 'completion_request_error'
    description = "Completion request failed."
    code = 400


class AppMoreLikeThisDisabledError(BaseHTTPException):
    error_code = 'app_more_like_this_disabled'
    description = "The 'More like this' feature is disabled. Please refresh your page."
    code = 403


class AppSuggestedQuestionsAfterAnswerDisabledError(BaseHTTPException):
    error_code = 'app_suggested_questions_after_answer_disabled'
    description = "The 'Suggested Questions After Answer' feature is disabled. Please refresh your page."
    code = 403

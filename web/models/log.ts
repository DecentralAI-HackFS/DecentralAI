// Log type contains key:string conversation_id:string created_at:string quesiton:string answer:string
export type Conversation = {
  id: string
  key: string
  conversationId: string
  question: string
  answer: string
  userRate: number
  adminRate: number
}

export type ConversationListResponse = {
  logs: Conversation[]
}

export const fetchLogs = (url: string) =>
  fetch(url).then<ConversationListResponse>(r => r.json())

export const CompletionParams = ['temperature', 'top_p', 'presence_penalty', 'max_token', 'stop', 'frequency_penalty'] as const

export type CompletionParamType = typeof CompletionParams[number]

export type CompletionParamsType = {
  max_tokens: number
  temperature: number
  top_p: number
  stop: string[]
  presence_penalty: number
  frequency_penalty: number
}

export type ModelConfigDetail = {
  introduction: string
  prompt_template: string
  prompt_variables: Array<{
    key: string
    name: string
    description: string
    type: string | number
    default: string
    options: string[]
  }>
  completion_params: CompletionParamsType
}

export type Annotation = {
  content: string
  account: {
    id: string
    name: string
    email: string
  }
  created_at?: number
}

export type MessageContent = {
  id: string
  conversation_id: string
  query: string
  inputs: Record<string, any>
  // message: Record<string, any>
  message: string
  message_tokens: number
  answer_tokens: number
  answer: string
  provider_response_latency: number
  created_at: number
  annotation: Annotation
  feedbacks: Array<{
    rating: 'like' | 'dislike' | null
    content: string | null
    from_source?: 'admin' | 'user'
    from_end_user_id?: string
  }>
}

export type CompletionConversationGeneralDetail = {
  id: string
  status: 'normal' | 'finished'
  from_source: 'api' | 'console'
  from_end_user_id: string
  from_account_id: string
  read_at: Date
  created_at: number
  annotation: Annotation
  user_feedback_stats: {
    like: number
    dislike: number
  }
  admin_feedback_stats: {
    like: number
    dislike: number
  }
  model_config: {
    provider: string
    model_id: string
    configs: Pick<ModelConfigDetail, 'prompt_template'>
  }
  message: Pick<MessageContent, 'inputs' | 'query' | 'answer' | 'message'>
}

export type CompletionConversationFullDetailResponse = {
  id: string
  status: 'normal' | 'finished'
  from_source: 'api' | 'console'
  from_end_user_id: string
  from_account_id: string
  // read_at: Date
  created_at: number
  model_config: {
    provider: string
    model_id: string
    configs: ModelConfigDetail
  }
  message: MessageContent
}

export type CompletionConversationsResponse = {
  data: Array<CompletionConversationGeneralDetail>
  has_more: boolean
  limit: number
  total: number
  page: number
}

export type CompletionConversationsRequest = {
  keyword: string
  start: string
  end: string
  annotation_status: string
  page: number
  limit: number // The default value is 20 and the range is 1-100
}

export type ChatConversationGeneralDetail = Omit<CompletionConversationGeneralDetail, 'message' | 'annotation'> & {
  summary: string
  message_count: number
  annotated: boolean
}

export type ChatConversationsResponse = {
  data: Array<ChatConversationGeneralDetail>
  has_more: boolean
  limit: number
  total: number
  page: number
}

export type ChatConversationsRequest = CompletionConversationsRequest & { message_count: number }

export type ChatConversationFullDetailResponse = Omit<CompletionConversationGeneralDetail, 'message' | 'model_config'> & {
  message_count: number
  model_config: {
    provider: string
    model_id: string
    configs: ModelConfigDetail
  }
}

export type ChatMessagesRequest = {
  conversation_id: string
  first_id?: string
  limit: number
}
export type ChatMessage = MessageContent

export type ChatMessagesResponse = {
  data: Array<ChatMessage>
  has_more: boolean
  limit: number
}

export const MessageRatings = ['like', 'dislike', null] as const
export type MessageRating = typeof MessageRatings[number]

export type LogMessageFeedbacksRequest = {
  message_id: string
  rating: MessageRating
  content?: string
}

export type LogMessageFeedbacksResponse = {
  result: 'success' | 'error'
}

export type LogMessageAnnotationsRequest = Omit<LogMessageFeedbacksRequest, 'rating'>

export type LogMessageAnnotationsResponse = LogMessageFeedbacksResponse

export type AnnotationsCountResponse = {
  count: number
}

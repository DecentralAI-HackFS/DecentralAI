import logging
from typing import Optional, List, Union, Tuple

from langchain.callbacks import CallbackManager
from langchain.chat_models.base import BaseChatModel
from langchain.llms import BaseLLM
from langchain.schema import BaseMessage, BaseLanguageModel, HumanMessage
from requests.exceptions import ChunkedEncodingError

from core.constant import llm_constant
from core.callback_handler.llm_callback_handler import LLMCallbackHandler
from core.callback_handler.std_out_callback_handler import DifyStreamingStdOutCallbackHandler, \
    DifyStdOutCallbackHandler
from core.conversation_message_task import ConversationMessageTask, ConversationTaskStoppedException, PubHandler
from core.llm.error import LLMBadRequestError
from core.llm.llm_builder import LLMBuilder
from core.chain.main_chain_builder import MainChainBuilder
from core.llm.streamable_chat_open_ai import StreamableChatOpenAI
from core.llm.streamable_open_ai import StreamableOpenAI
from core.memory.read_only_conversation_token_db_buffer_shared_memory import \
    ReadOnlyConversationTokenDBBufferSharedMemory
from core.memory.read_only_conversation_token_db_string_buffer_shared_memory import \
    ReadOnlyConversationTokenDBStringBufferSharedMemory
from core.prompt.prompt_builder import PromptBuilder
from core.prompt.prompt_template import OutLinePromptTemplate
from core.prompt.prompts import MORE_LIKE_THIS_GENERATE_PROMPT
from models.model import App, AppModelConfig, Account, Conversation, Message


class Completion:
    @classmethod
    def generate(cls, task_id: str, app: App, app_model_config: AppModelConfig, query: str, inputs: dict,
                 user: Account, conversation: Optional[Conversation], streaming: bool, is_override: bool = False):
        """
        errors: ProviderTokenNotInitError
        """
        cls.validate_query_tokens(app.tenant_id, app_model_config, query)

        memory = None
        if conversation:
            # get memory of conversation (read-only)
            memory = cls.get_memory_from_conversation(
                tenant_id=app.tenant_id,
                app_model_config=app_model_config,
                conversation=conversation,
                return_messages=False
            )

            inputs = conversation.inputs

        conversation_message_task = ConversationMessageTask(
            task_id=task_id,
            app=app,
            app_model_config=app_model_config,
            user=user,
            conversation=conversation,
            is_override=is_override,
            inputs=inputs,
            query=query,
            streaming=streaming
        )

        # build main chain include agent
        main_chain = MainChainBuilder.to_langchain_components(
            tenant_id=app.tenant_id,
            agent_mode=app_model_config.agent_mode_dict,
            memory=ReadOnlyConversationTokenDBStringBufferSharedMemory(memory=memory) if memory else None,
            conversation_message_task=conversation_message_task
        )

        chain_output = ''
        if main_chain:
            chain_output = main_chain.run(query)

        # run the final llm
        try:
            cls.run_final_llm(
                tenant_id=app.tenant_id,
                mode=app.mode,
                app_model_config=app_model_config,
                query=query,
                inputs=inputs,
                chain_output=chain_output,
                conversation_message_task=conversation_message_task,
                memory=memory,
                streaming=streaming
            )
        except ConversationTaskStoppedException:
            return
        except ChunkedEncodingError as e:
            # Interrupt by LLM (like OpenAI), handle it.
            logging.warning(f'ChunkedEncodingError: {e}')
            conversation_message_task.end()
            return

    @classmethod
    def run_final_llm(cls, tenant_id: str, mode: str, app_model_config: AppModelConfig, query: str, inputs: dict,
                      chain_output: str,
                      conversation_message_task: ConversationMessageTask,
                      memory: Optional[ReadOnlyConversationTokenDBBufferSharedMemory], streaming: bool):
        final_llm = LLMBuilder.to_llm_from_model(
            tenant_id=tenant_id,
            model=app_model_config.model_dict,
            streaming=streaming
        )

        # get llm prompt
        prompt, stop_words = cls.get_main_llm_prompt(
            mode=mode,
            llm=final_llm,
            pre_prompt=app_model_config.pre_prompt,
            query=query,
            inputs=inputs,
            chain_output=chain_output,
            memory=memory
        )

        final_llm.callback_manager = cls.get_llm_callback_manager(final_llm, streaming, conversation_message_task)

        cls.recale_llm_max_tokens(
            final_llm=final_llm,
            prompt=prompt,
            mode=mode
        )

        response = final_llm.generate([prompt], stop_words)

        return response

    @classmethod
    def get_main_llm_prompt(cls, mode: str, llm: BaseLanguageModel, pre_prompt: str, query: str, inputs: dict,
                            chain_output: Optional[str],
                            memory: Optional[ReadOnlyConversationTokenDBBufferSharedMemory]) -> \
            Tuple[Union[str | List[BaseMessage]], Optional[List[str]]]:
        # disable template string in query
        query_params = OutLinePromptTemplate.from_template(template=query).input_variables
        if query_params:
            for query_param in query_params:
                if query_param not in inputs:
                    inputs[query_param] = '{' + query_param + '}'

        pre_prompt = PromptBuilder.process_template(pre_prompt) if pre_prompt else pre_prompt
        if mode == 'completion':
            prompt_template = OutLinePromptTemplate.from_template(
                template=("""Use the following CONTEXT as your learned knowledge:
[CONTEXT]
{context}
[END CONTEXT]

When answer to user:
- If you don't know, just say that you don't know.
- If you don't know when you are not sure, ask for clarification. 
Avoid mentioning that you obtained the information from the context.
And answer according to the language of the user's question.
""" if chain_output else "")
                         + (pre_prompt + "\n" if pre_prompt else "")
                         + "{query}\n"
            )

            if chain_output:
                inputs['context'] = chain_output
                context_params = OutLinePromptTemplate.from_template(template=chain_output).input_variables
                if context_params:
                    for context_param in context_params:
                        if context_param not in inputs:
                            inputs[context_param] = '{' + context_param + '}'

            prompt_inputs = {k: inputs[k] for k in prompt_template.input_variables if k in inputs}
            prompt_content = prompt_template.format(
                query=query,
                **prompt_inputs
            )

            if isinstance(llm, BaseChatModel):
                # use chat llm as completion model
                return [HumanMessage(content=prompt_content)], None
            else:
                return prompt_content, None
        else:
            messages: List[BaseMessage] = []

            human_inputs = {
                "query": query
            }

            human_message_prompt = ""

            if pre_prompt:
                pre_prompt_inputs = {k: inputs[k] for k in
                                     OutLinePromptTemplate.from_template(template=pre_prompt).input_variables
                                     if k in inputs}

                if pre_prompt_inputs:
                    human_inputs.update(pre_prompt_inputs)

            if chain_output:
                human_inputs['context'] = chain_output
                human_message_prompt += """Use the following CONTEXT as your learned knowledge.
[CONTEXT]
{context}
[END CONTEXT]

When answer to user:
- If you don't know, just say that you don't know.
- If you don't know when you are not sure, ask for clarification. 
Avoid mentioning that you obtained the information from the context.
And answer according to the language of the user's question.
"""

            if pre_prompt:
                human_message_prompt += pre_prompt

            query_prompt = "\nHuman: {query}\nAI: "

            if memory:
                # append chat histories
                tmp_human_message = PromptBuilder.to_human_message(
                    prompt_content=human_message_prompt + query_prompt,
                    inputs=human_inputs
                )

                curr_message_tokens = memory.llm.get_messages_tokens([tmp_human_message])
                rest_tokens = llm_constant.max_context_token_length[memory.llm.model_name] \
                              - memory.llm.max_tokens - curr_message_tokens
                rest_tokens = max(rest_tokens, 0)
                histories = cls.get_history_messages_from_memory(memory, rest_tokens)

                # disable template string in query
                histories_params = OutLinePromptTemplate.from_template(template=histories).input_variables
                if histories_params:
                    for histories_param in histories_params:
                        if histories_param not in human_inputs:
                            human_inputs[histories_param] = '{' + histories_param + '}'

                human_message_prompt += "\n\n" + histories

            human_message_prompt += query_prompt

            # construct main prompt
            human_message = PromptBuilder.to_human_message(
                prompt_content=human_message_prompt,
                inputs=human_inputs
            )

            messages.append(human_message)

            return messages, ['\nHuman:']

    @classmethod
    def get_llm_callback_manager(cls, llm: Union[StreamableOpenAI, StreamableChatOpenAI],
                                 streaming: bool,
                                 conversation_message_task: ConversationMessageTask) -> CallbackManager:
        llm_callback_handler = LLMCallbackHandler(llm, conversation_message_task)
        if streaming:
            callback_handlers = [llm_callback_handler, DifyStreamingStdOutCallbackHandler()]
        else:
            callback_handlers = [llm_callback_handler, DifyStdOutCallbackHandler()]

        return CallbackManager(callback_handlers)

    @classmethod
    def get_history_messages_from_memory(cls, memory: ReadOnlyConversationTokenDBBufferSharedMemory,
                                         max_token_limit: int) -> \
            str:
        """Get memory messages."""
        memory.max_token_limit = max_token_limit
        memory_key = memory.memory_variables[0]
        external_context = memory.load_memory_variables({})
        return external_context[memory_key]

    @classmethod
    def get_memory_from_conversation(cls, tenant_id: str, app_model_config: AppModelConfig,
                                     conversation: Conversation,
                                     **kwargs) -> ReadOnlyConversationTokenDBBufferSharedMemory:
        # only for calc token in memory
        memory_llm = LLMBuilder.to_llm_from_model(
            tenant_id=tenant_id,
            model=app_model_config.model_dict
        )

        # use llm config from conversation
        memory = ReadOnlyConversationTokenDBBufferSharedMemory(
            conversation=conversation,
            llm=memory_llm,
            max_token_limit=kwargs.get("max_token_limit", 2048),
            memory_key=kwargs.get("memory_key", "chat_history"),
            return_messages=kwargs.get("return_messages", True),
            input_key=kwargs.get("input_key", "input"),
            output_key=kwargs.get("output_key", "output"),
            message_limit=kwargs.get("message_limit", 10),
        )

        return memory

    @classmethod
    def validate_query_tokens(cls, tenant_id: str, app_model_config: AppModelConfig, query: str):
        llm = LLMBuilder.to_llm_from_model(
            tenant_id=tenant_id,
            model=app_model_config.model_dict
        )

        model_limited_tokens = llm_constant.max_context_token_length[llm.model_name]
        max_tokens = llm.max_tokens

        if model_limited_tokens - max_tokens - llm.get_num_tokens(query) < 0:
            raise LLMBadRequestError("Query is too long")

    @classmethod
    def recale_llm_max_tokens(cls, final_llm: Union[StreamableOpenAI, StreamableChatOpenAI],
                              prompt: Union[str, List[BaseMessage]], mode: str):
        # recalc max_tokens if sum(prompt_token +  max_tokens) over model token limit
        model_limited_tokens = llm_constant.max_context_token_length[final_llm.model_name]
        max_tokens = final_llm.max_tokens

        if mode == 'completion' and isinstance(final_llm, BaseLLM):
            prompt_tokens = final_llm.get_num_tokens(prompt)
        else:
            prompt_tokens = final_llm.get_messages_tokens(prompt)

        if prompt_tokens + max_tokens > model_limited_tokens:
            max_tokens = max(model_limited_tokens - prompt_tokens, 16)
            final_llm.max_tokens = max_tokens

    @classmethod
    def generate_more_like_this(cls, task_id: str, app: App, message: Message, pre_prompt: str,
                                app_model_config: AppModelConfig, user: Account, streaming: bool):
        llm: StreamableOpenAI = LLMBuilder.to_llm(
            tenant_id=app.tenant_id,
            model_name='gpt-3.5-turbo',
            streaming=streaming
        )

        # get llm prompt
        original_prompt, _ = cls.get_main_llm_prompt(
            mode="completion",
            llm=llm,
            pre_prompt=pre_prompt,
            query=message.query,
            inputs=message.inputs,
            chain_output=None,
            memory=None
        )

        original_completion = message.answer.strip()

        prompt = MORE_LIKE_THIS_GENERATE_PROMPT
        prompt = prompt.format(prompt=original_prompt, original_completion=original_completion)

        if isinstance(llm, BaseChatModel):
            prompt = [HumanMessage(content=prompt)]

        conversation_message_task = ConversationMessageTask(
            task_id=task_id,
            app=app,
            app_model_config=app_model_config,
            user=user,
            inputs=message.inputs,
            query=message.query,
            is_override=True if message.override_model_configs else False,
            streaming=streaming
        )

        llm.callback_manager = cls.get_llm_callback_manager(llm, streaming, conversation_message_task)

        cls.recale_llm_max_tokens(
            final_llm=llm,
            prompt=prompt,
            mode='completion'
        )

        llm.generate([prompt])

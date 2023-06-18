import logging
import time

from typing import Any, Dict, List, Union, Optional

from langchain.callbacks.base import BaseCallbackHandler
from langchain.schema import AgentAction, AgentFinish, LLMResult

from core.callback_handler.entity.agent_loop import AgentLoop
from core.conversation_message_task import ConversationMessageTask


class AgentLoopGatherCallbackHandler(BaseCallbackHandler):
    """Callback Handler that prints to std out."""

    def __init__(self, model_name, conversation_message_task: ConversationMessageTask) -> None:
        """Initialize callback handler."""
        self.model_name = model_name
        self.conversation_message_task = conversation_message_task
        self._agent_loops = []
        self._current_loop = None
        self.current_chain = None

    @property
    def agent_loops(self) -> List[AgentLoop]:
        return self._agent_loops

    def clear_agent_loops(self) -> None:
        self._agent_loops = []
        self._current_loop = None

    @property
    def always_verbose(self) -> bool:
        """Whether to call verbose callbacks even if verbose is False."""
        return True

    @property
    def ignore_chain(self) -> bool:
        """Whether to ignore chain callbacks."""
        return True

    def on_llm_start(
        self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any
    ) -> None:
        """Print out the prompts."""
        # serialized={'name': 'OpenAI'}
        # prompts=['Answer the following questions...\nThought:']
        # kwargs={}
        if not self._current_loop:
            # Agent start with a LLM query
            self._current_loop = AgentLoop(
                position=len(self._agent_loops) + 1,
                prompt=prompts[0],
                status='llm_started',
                started_at=time.perf_counter()
            )

    def on_llm_end(self, response: LLMResult, **kwargs: Any) -> None:
        """Do nothing."""
        # kwargs={}
        if self._current_loop and self._current_loop.status == 'llm_started':
            self._current_loop.status = 'llm_end'
            self._current_loop.prompt_tokens = response.llm_output['token_usage']['prompt_tokens']
            self._current_loop.completion = response.generations[0][0].text
            self._current_loop.completion_tokens = response.llm_output['token_usage']['completion_tokens']

    def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
        """Do nothing."""
        pass

    def on_llm_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> None:
        logging.error(error)
        self._agent_loops = []
        self._current_loop = None

    def on_chain_start(
        self, serialized: Dict[str, Any], inputs: Dict[str, Any], **kwargs: Any
    ) -> None:
        """Print out that we are entering a chain."""
        pass

    def on_chain_end(self, outputs: Dict[str, Any], **kwargs: Any) -> None:
        """Print out that we finished a chain."""
        pass

    def on_chain_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> None:
        logging.error(error)

    def on_tool_start(
        self,
        serialized: Dict[str, Any],
        input_str: str,
        **kwargs: Any,
    ) -> None:
        """Do nothing."""
        # kwargs={'color': 'green', 'llm_prefix': 'Thought:', 'observation_prefix': 'Observation: '}
        # input_str='action-input'
        # serialized={'description': 'A search engine. Useful for when you need to answer questions about current events. Input should be a search query.', 'name': 'Search'}
        pass

    def on_agent_action(
        self, action: AgentAction, color: Optional[str] = None, **kwargs: Any
    ) -> Any:
        """Run on agent action."""
        tool = action.tool
        tool_input = action.tool_input
        action_name_position = action.log.index("\nAction:") + 1 if action.log else -1
        thought = action.log[:action_name_position].strip() if action.log else ''

        if self._current_loop and self._current_loop.status == 'llm_end':
            self._current_loop.status = 'agent_action'
            self._current_loop.thought = thought
            self._current_loop.tool_name = tool
            self._current_loop.tool_input = tool_input

    def on_tool_end(
        self,
        output: str,
        color: Optional[str] = None,
        observation_prefix: Optional[str] = None,
        llm_prefix: Optional[str] = None,
        **kwargs: Any,
    ) -> None:
        """If not the final action, print out observation."""
        # kwargs={'name': 'Search'}
        # llm_prefix='Thought:'
        # observation_prefix='Observation: '
        # output='53 years'

        if self._current_loop and self._current_loop.status == 'agent_action' and output and output != 'None':
            self._current_loop.status = 'tool_end'
            self._current_loop.tool_output = output
            self._current_loop.completed = True
            self._current_loop.completed_at = time.perf_counter()
            self._current_loop.latency = self._current_loop.completed_at - self._current_loop.started_at

            self.conversation_message_task.on_agent_end(self.current_chain, self.model_name, self._current_loop)

            self._agent_loops.append(self._current_loop)
            self._current_loop = None

    def on_tool_error(
        self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any
    ) -> None:
        """Do nothing."""
        logging.error(error)
        self._agent_loops = []
        self._current_loop = None

    def on_text(
        self,
        text: str,
        color: Optional[str] = None,
        end: str = "",
        **kwargs: Optional[str],
    ) -> None:
        """Run on additional input from chains and agents."""
        pass

    def on_agent_finish(self, finish: AgentFinish, **kwargs: Any) -> Any:
        """Run on agent end."""
        # Final Answer
        if self._current_loop and (self._current_loop.status == 'llm_end' or self._current_loop.status == 'agent_action'):
            self._current_loop.status = 'agent_finish'
            self._current_loop.completed = True
            self._current_loop.completed_at = time.perf_counter()
            self._current_loop.latency = self._current_loop.completed_at - self._current_loop.started_at

            self.conversation_message_task.on_agent_end(self.current_chain, self.model_name, self._current_loop)

            self._agent_loops.append(self._current_loop)
            self._current_loop = None
        elif not self._current_loop and self._agent_loops:
            self._agent_loops[-1].status = 'agent_finish'

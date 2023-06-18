import os

from langchain.llms import AzureOpenAI
from langchain.schema import LLMResult
from typing import Optional, List, Dict, Mapping, Any

from pydantic import root_validator

from core.llm.error_handle_wraps import handle_llm_exceptions, handle_llm_exceptions_async


class StreamableAzureOpenAI(AzureOpenAI):
    openai_api_type: str = "azure"
    openai_api_version: str = ""

    @root_validator()
    def validate_environment(cls, values: Dict) -> Dict:
        """Validate that api key and python package exists in environment."""
        try:
            import openai

            values["client"] = openai.Completion
        except ImportError:
            raise ValueError(
                "Could not import openai python package. "
                "Please install it with `pip install openai`."
            )
        if values["streaming"] and values["n"] > 1:
            raise ValueError("Cannot stream results when n > 1.")
        if values["streaming"] and values["best_of"] > 1:
            raise ValueError("Cannot stream results when best_of > 1.")
        return values

    @property
    def _invocation_params(self) -> Dict[str, Any]:
        return {**super()._invocation_params, **{
            "api_type": self.openai_api_type,
            "api_base": self.openai_api_base,
            "api_version": self.openai_api_version,
            "api_key": self.openai_api_key,
            "organization": self.openai_organization if self.openai_organization else None,
        }}

    @property
    def _identifying_params(self) -> Mapping[str, Any]:
        return {**super()._identifying_params, **{
            "api_type": self.openai_api_type,
            "api_base": self.openai_api_base,
            "api_version": self.openai_api_version,
            "api_key": self.openai_api_key,
            "organization": self.openai_organization if self.openai_organization else None,
        }}

    @handle_llm_exceptions
    def generate(
            self, prompts: List[str], stop: Optional[List[str]] = None
    ) -> LLMResult:
        return super().generate(prompts, stop)

    @handle_llm_exceptions_async
    async def agenerate(
            self, prompts: List[str], stop: Optional[List[str]] = None
    ) -> LLMResult:
        return await super().agenerate(prompts, stop)

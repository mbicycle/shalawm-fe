type AskChatResponse = {
  _history: { message_type: string; message: string; time_stamp: string }[];
  _llm_response: string;
  _llm_response_eval_result: { _embedding_distance: number };
  _sources: string[];
};

type HistoryItem = {
  message: string;
  message_type: string;
  time_stamp: string;
  sources?: string[];
  LLMResponseEvaluationMetrics?: Record<string, unknown>;
};

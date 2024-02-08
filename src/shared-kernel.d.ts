type Message = {
  text: string;
  from: string;
  timestamp: string;
  sources: string[];
  LLMResponseEvaluationMetrics: Record<string, unknown>;
};

type HistoryType = Message[];

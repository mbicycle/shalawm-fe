import { askChatBot, clearChatHistory, getChatHistory } from "@/entities/chat";
import { getISOTimeStamp } from "@/shared/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

export const useChat = () => {
  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: askChatBot,
    onMutate: () => setPrompt(""),
    onSuccess: ({ data }) => {
      client.setQueryData(["history"], () => {
        const history = data._history;
        const lastResponse = history[history.length - 1] as HistoryItem;
        lastResponse.sources = data._sources;
        lastResponse.LLMResponseEvaluationMetrics =
          data._llm_response_eval_result;

        return history;
      });
    },
  });

  const {
    data: messages = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["history"],
    queryFn: getChatHistory,
  });

  const { mutate: clear, isPending: clearing } = useMutation({
    mutationFn: clearChatHistory,
    onSuccess: () => refetch(),
  });

  const [prompt, setPrompt] = useState("");
  const changePrompt = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setPrompt(value);

  const ask = () =>
    mutate({
      message: prompt,
      message_type: "human",
      timestamp: getISOTimeStamp(),
    });

  return {
    messages,
    loading: isLoading,
    asking: isPending,
    ask,
    prompt,
    changePrompt,
    clearHistory: () => clear(),
    clearing,
  };
};

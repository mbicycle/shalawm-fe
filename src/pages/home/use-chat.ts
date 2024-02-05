import { askChatBot, clearChatHistory } from "@/entities/chat";
import { getTime } from "@/shared/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";

export const useChat = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: askChatBot,
    onMutate: () => {
      setMessages((p) => [
        ...p,
        { from: "you", text: prompt, timestamp: getTime(), sources: [] },
      ]);
      setPrompt("");
    },
    onSuccess: ({ data }) => {
      setMessages((p) => [
        ...p,
        {
          from: "ai",
          text: data.llm_response,
          timestamp: getTime(),
          sources: data.sources,
        },
      ]);
    },
  });

  const { mutate: clear, isPending: clearing } = useMutation({
    mutationFn: clearChatHistory,
    onSuccess: () => {
      setMessages([]);
      setPrompt("");
      localStorage.removeItem("history");
    },
  });
  const [messages, setMessages] = useState<HistoryType>([]);

  const [prompt, setPrompt] = useState("");
  const changePrompt = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setPrompt(value);

  const ask = () => mutate({ user_query: prompt });

  useEffect(() => {
    if (messages.length !== 0)
      localStorage.setItem("history", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const history = localStorage.getItem("history");
    if (history) setMessages(JSON.parse(history));
  }, []);

  return {
    messages,
    asking: isPending,
    ask,
    prompt,
    changePrompt,
    clearHistory: () => clear(),
    clearing,
  };
};

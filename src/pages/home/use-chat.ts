import { mockServer } from "@/mocks/server";
import { getTime } from "@/shared/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";

export const useChat = () => {
  const [messages, setMessages] = useState<HistoryType>([]);
  const [asking, setAsking] = useState(false);

  const [prompt, setPrompt] = useState("");
  const changePrompt = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setPrompt(value);

  const ask = async () => {
    if (prompt && !asking) {
      const myMessage = {
        id: Date.now().toString(),
        text: prompt,
        from: "you",
        timestamp: getTime(),
      };
      setPrompt("");
      setMessages((p) => [...p, myMessage]);
      setAsking(true);
      const history = await mockServer.sendMessage(myMessage);
      setMessages([...history]);
      setAsking(false);
    }
  };

  useEffect(() => {
    mockServer.getMessages().then(setMessages);
  }, []);

  return { messages, asking, ask, prompt, changePrompt };
};

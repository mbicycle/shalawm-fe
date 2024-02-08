import { instance } from "@/shared/api/instance";

export const askChatBot = ({
  message_type = "HUMAN_MESSAGE",
  message,
  timestamp,
}: {
  message_type: "HUMAN_MESSAGE";
  message: string;
  timestamp: string;
}) =>
  instance.post<AskChatResponse>("/chat/ask", {
    message_type,
    message,
    timestamp,
  });

export const clearChatHistory = () =>
  instance.post("/chat/clear-message-history");

export const getChatHistory = () =>
  instance
    .get<HistoryItem[]>("/chat/message-history")
    .then((response) => response.data);

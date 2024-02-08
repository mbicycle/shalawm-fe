import { instance } from "@/shared/api/instance";

export const askChatBot = ({
  message_type = "HUMAN_MESSAGE",
  message,
  time_stamp,
}: {
  message_type: "HUMAN_MESSAGE";
  message: string;
  time_stamp: string;
}) =>
  instance.post<AskChatResponse>("/chat/ask", {
    message_type,
    message,
    time_stamp,
  });

export const clearChatHistory = () =>
  instance.post("/chat/clear-message-history");

export const getChatHistory = () =>
  instance
    .get<HistoryItem[]>("/chat/message-history")
    .then((response) => response.data);

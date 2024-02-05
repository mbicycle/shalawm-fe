import { instance } from "@/shared/api/instance";

export const askChatBot = ({ user_query }: { user_query: string }) =>
  instance.post<AskChatResponse>("/chat/ask", { user_query });

export const clearChatHistory = () => instance.post("/chat/clear-chat-history");

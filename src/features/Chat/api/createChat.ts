import { Api } from "@/services/Api/Api";

type CreateChatRequest = {
  participants: string[];
};

type CreateChatResponse = {
  chat_id: string;
  participants: string[];
};

export const createChat = async (
  body: CreateChatRequest
): Promise<CreateChatResponse> => {
  const response = await Api.post("/chats", {
    body,
  });

  return response;
};

import { Api } from "@/services/Api/Api";

type JoinTheChatRequest = {
  id: string;
  user_id: string;
};

type JoinTheChatResponse = {
  chat_id: string;
  participants: string[];
};

export const joinTheChat = async (
  body: JoinTheChatRequest
): Promise<JoinTheChatResponse> => {
  const { id } = body;
  const response = await Api.put(`/chats/${id}/participants`, {
    body,
  });

  return response;
};

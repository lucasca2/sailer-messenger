import { Api } from "@/services/Api/Api";

type GetChatParams = {
  id: string;
};

type GetChatResponse = {
  chat_id: string;
  created_by: string;
  participants: string[];
};

export const getChat = async (
  params: GetChatParams
): Promise<GetChatResponse> => {
  const response = await Api.get(`/chats/${params.id}`);

  return response;
};

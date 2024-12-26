import { Api } from "@/services/Api/Api";

export type Message = {
  id: string;
  user_id: string;
  content: string;
  timestamp: string;
  type: "text";
};

type GetChatMessagesParams = {
  id: string;
};

type GetChatMessagesResponse = Message[];

export const getChatMessages = async (
  params: GetChatMessagesParams
): Promise<GetChatMessagesResponse> => {
  const response = await Api.get(`/chats/${params.id}/messages`);

  return response;
};

import { Api } from "@/services/Api/Api";

type Chat = {
  chat_id: string;
  created_by: string;
  participants: string[];
}

type GetChatResponse = Chat[];

export const getChats = async (): Promise<GetChatResponse> => {
  const response = await Api.get(`/chats`);

  return response;
};

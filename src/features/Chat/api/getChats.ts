import { Api } from "@/services/Api/Api";

type Chat = {
  chat_id: string;
  created_by: string;
  participants: string[];
};

type GetChatResponse = Chat[];

export const getChats = async (): Promise<GetChatResponse> => {
  return await Api.get(`/chats`, {
    cache: "no-store",
  });
};

import { Api } from "@/services/Api/Api";

type SendMessageRequest = {
  chat_id: string;
  user_id: string;
  type: "text";
  content: string;
};

type SendMessageResponse = {
  status: boolean;
};

export const sendMessage = async (
  body: SendMessageRequest
): Promise<SendMessageResponse> => {
  const { chat_id } = body;
  
  const response = await Api.post(`/chats/${chat_id}/messages`, {
    body,
  });

  if (response === "message_sent") return { status: true };

  return { status: false };
};

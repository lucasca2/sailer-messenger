import { Api } from "@/services/Api/Api";
import { Presence } from "./getChatPresence";

type UpdateChatPresenceRequest = {
  id: string;
  user_id: string;
  status: "online" | "offline" | "typing";
};

type UpdateChatPresenceResponse = Presence;

export const updateChatPresence = async (
  body: UpdateChatPresenceRequest
): Promise<UpdateChatPresenceResponse> => {
  const { id } = body;
  const response = await Api.post(`/chats/${id}/presence`, {
    body,
  });

  return response;
};

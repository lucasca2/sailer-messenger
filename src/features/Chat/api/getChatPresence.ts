import { Api } from "@/services/Api/Api";

export type Presence = {
  user_id: string;
  status: "online" | "offline" | "typing";
  last_seen: string;
}

type GetChatPresenceRequest = {
  id: string;
};

type GetChatPresenceResponse = Presence[];

export const getChatPresence = async (
  params: GetChatPresenceRequest
): Promise<GetChatPresenceResponse> => {
  const response = await Api.get(`/chats/${params.id}/presence`);

  return response;
};

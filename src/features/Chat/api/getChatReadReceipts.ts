import { Api } from "@/services/Api/Api";

export type ReadReceipt = {
  // id: string;
  // user_id: string;
  // content: string;
  // timestamp: Date;
  // type: "text";
};

type GetChatReadReceiptsParams = {
  id: string;
};

type GetChatReadReceiptsResponse = ReadReceipt[];

export const getChatReadReceipts = async (
  params: GetChatReadReceiptsParams
): Promise<GetChatReadReceiptsResponse> => {
  const response = await Api.get(`/chats/${params.id}/read`);

  return response;
};

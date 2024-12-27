import { Api } from "@/services/Api/Api";

export type ReadReceipt = any;

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

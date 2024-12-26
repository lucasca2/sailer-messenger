import { Chat } from "@/features/Chat/Chat";
import { Layout } from "@/layouts/Layout";

type ChatPageParams = {
  params: {
    id: string;
  };
};

export default async function ChatPage({ params }: ChatPageParams) {
  const { id } = await params;

  return (
    <Layout.Main>
      <Chat.Room id={id} />
    </Layout.Main>
  );
}

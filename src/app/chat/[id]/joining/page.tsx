import { Chat } from "@/features/Chat/Chat";
import { Layout } from "@/layouts/Layout";

type ChatPageParams = {
  params: Promise<{
    id: string;
  }>;
};

export default async function JoiningPage({ params }: ChatPageParams) {
  const { id } = await params;

  return (
    <Layout.Main>
      <Chat.Joining id={id} />
    </Layout.Main>
  );
}

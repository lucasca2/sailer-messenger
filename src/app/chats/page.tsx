import { Chat } from "@/features/Chat/Chat";
import { Layout } from "@/layouts/Layout";

export default async function ChatsPage() {
  return (
    <Layout.Main>
      <Chat.List />
    </Layout.Main>
  );
}

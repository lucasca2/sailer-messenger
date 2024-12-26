import { getNickname } from "../../actions/getNickname";
import { getChat } from "../../api/getChat";
import { Card } from "../../components/Card/Card";

import styles from "./Room.module.scss";
import { redirect } from "next/navigation";
import { getChatMessages } from "../../api/getChatMessages";
import { FormSendMessage } from "./components/FormSendMessage/FormSendMessage";
import { Messages } from "./components/Messages/Messages";
import { Header } from "./components/Header/Header";
import { getChatPresence } from "../../api/getChatPresence";
import { MessagesProvider } from "../../provider/useMessages";
import { PresenceProvider } from "../../provider/usePresence";

type RoomProps = {
  id: string;
};

export const Room = async ({ id }: RoomProps) => {
  const chat = await getChat({ id });
  const nickname = await getNickname();

  const isUserInChat = chat.participants.includes(nickname || "");

  if (!isUserInChat || !nickname) redirect(`/chat/${id}/joining`);

  const owner = chat.created_by;
  const messages = await getChatMessages({ id });
  const presence = await getChatPresence({ id });

  return (
    <div className={styles.wrapper}>
      <PresenceProvider initialPresence={presence} nickname={nickname}>
        <MessagesProvider initialMessages={messages} nickname={nickname}>
          <Card className={styles.card}>
            <Header owner={owner} nickname={nickname} />
            <Messages nickname={nickname} />
            <FormSendMessage nickname={nickname} chatId={chat.chat_id} />
          </Card>
        </MessagesProvider>
      </PresenceProvider>
    </div>
  );
};

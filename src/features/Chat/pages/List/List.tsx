import { Icon } from "@/components/Icon/Icon";
import { getChats } from "../../api/getChats";
import { Card } from "../../components/Card/Card";

import styles from "./List.module.scss";
import Link from "next/link";

export const List = async () => {
  const chats = await getChats();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>Chats</h1>
        {chats?.map((chat) => (
          <Card key={chat.chat_id} className={styles.chatItem}>
            <Icon name="message-chat-square" />
            <span className={styles.chatName}>{chat.created_by}‘s chat</span>
            <span className={styles.participants}>
              <Icon name="users-01" />
              <span className={styles.participantsQuantity}>
                {chat.participants.length}
              </span>
            </span>
            <Link href={`/chat/${chat.chat_id}`}>
              <Icon name="send-01" />
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

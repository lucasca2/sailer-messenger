"use client";
import styles from "./Messages.module.scss";
import { useEffect, useMemo, useRef } from "react";
import { Message } from "./components/Message/Message";
import { useMessages } from "@/features/Chat/provider/useMessages";
import { useScrollToBottom } from "./hooks/useScrollToBottom";

type MessagesProps = {
  nickname: string;
};

export const Messages = ({ nickname }: MessagesProps) => {
  const { messages } = useMessages();

  const messageWrapperRef = useRef<HTMLDivElement>(null);

  const { scrollToBottom } = useScrollToBottom(messageWrapperRef);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const messagesRender = useMemo(() => {
    return messages?.map((message) => (
      <Message
        key={message.id}
        nickname={nickname}
        content={message.content}
        id={message.id}
        user_id={message.user_id}
        read={message.read}
        timestamp={message.timestamp}
        type={message.type}
      />
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  return (
    <div className={styles.messages} ref={messageWrapperRef}>
      {messagesRender}
    </div>
  );
};

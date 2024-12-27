"use client";
import dayjs from "dayjs";

import { classNames } from "@/utils/classNames";

import { Message } from "@/features/Chat/api/getChatMessages";

import styles from "./Messages.module.scss";
import { useEffect, useRef, useState } from "react";
import useSocket from "@/services/Socket/useSocket";

type MessagesProps = {
  initialMessages: Message[];
  nickname: string;
  chatId: string;
};

export const Messages = ({
  initialMessages = [],
  nickname,
  chatId,
}: MessagesProps) => {
  const isFirstRender = useRef(true);

  const { socket } = useSocket({
    url: `/${chatId}`,
  });
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const messageWrapperRef = useRef<HTMLDivElement>(null);

  const handleScrollToBottom = () => {
    if (!messageWrapperRef.current) return;

    if (!!isFirstRender.current) {
      isFirstRender.current = false;
      messageWrapperRef.current.scrollTo({
        top: messageWrapperRef.current.scrollHeight,
      });

      messageWrapperRef.current.style.visibility = "visible";
      return;
    }

    messageWrapperRef.current.scrollTo({
      top: messageWrapperRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleScrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("message_received", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, [socket]);

  return (
    <div className={styles.messages} ref={messageWrapperRef}>
      {messages.map((message) => {
        const isOwnMessage = message.user_id === nickname;

        const rowClassName = classNames(styles.row, {
          [styles.row__yourself]: isOwnMessage,
        });

        return (
          <div key={message.id} className={rowClassName}>
            <span className={styles.nickname}>
              {isOwnMessage ? "you" : message.user_id}
            </span>

            <div className={styles.messageWrapper}>
              <div className={styles.message}>{message.content}</div>
            </div>

            <span className={styles.timestamp}>
              {dayjs(message.timestamp).format("HH:mm")}
            </span>
          </div>
        );
      })}
    </div>
  );
};

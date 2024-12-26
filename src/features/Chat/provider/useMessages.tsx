"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Message } from "../api/getChatMessages";
import { useParams } from "next/navigation";
import useSocket from "@/services/Socket/useSocket";
import { usePresence } from "./usePresence";
import dayjs from "dayjs";

export type MessageWithReadStatus = Message & {
  read: boolean;
};

type MessagesContextType = {
  messages?: MessageWithReadStatus[];
};

const MessagesContext = createContext<MessagesContextType>({});

type MessagesProviderProps = {
  initialMessages: Message[];
  nickname: string;
  children: React.ReactNode;
};

export const MessagesProvider = ({
  children,
  initialMessages = [],
}: MessagesProviderProps) => {
  const { id } = useParams();
  const { presence } = usePresence();

  const { socket } = useSocket({
    url: `/${id}`,
  });

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    socket.on("message_received", (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, [socket]);

  const messagesWithReadStatus = useMemo(() => {
    if (!presence || !messages) return;

    return messages.map((message) => {
      const hasEveryoneRead = presence.every((user) => {
        if(user.user_id === message.user_id) return true;

        return dayjs(user.last_seen).isAfter(dayjs(message.timestamp));
      });

      return {
        ...message,
        read: hasEveryoneRead,
      };
    });
  }, [messages, presence]);

  return (
    <MessagesContext.Provider value={{ messages: messagesWithReadStatus }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);

  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }

  return context;
};

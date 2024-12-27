"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import useSocket from "@/services/Socket/useSocket";
import { Presence } from "../api/getChatPresence";
import { useUpdateChatPresence } from "../hooks/useUpdateChatPresence";

type PresenceContextType = {
  presence?: Presence[];
  userTyping?: Presence;
};

const PresenceContext = createContext<PresenceContextType>({});

type PresenceProviderProps = {
  initialPresence: Presence[];
  nickname: string;
  children: React.ReactNode;
};

export const PresenceProvider = ({
  children,
  nickname,
  initialPresence = [],
}: PresenceProviderProps) => {
  const { id } = useParams();
  const { socket } = useSocket({
    url: `/${id}`,
  });

  const [presence, setPresence] = useState<Presence[]>(initialPresence);

  useEffect(() => {
    socket.on("presence_updated", (newPresence: Presence) => {
      setPresence((currentPresence) => {
        const presenceToUpdate = currentPresence.find(
          (user) => user.user_id === newPresence.user_id
        );

        if (!presenceToUpdate) {
          return [...currentPresence, newPresence];
        }

        return currentPresence.map((user) => {
          if (user.user_id === newPresence.user_id) return newPresence;

          return user;
        });
      });
    });
  }, [socket]);

  const { userPresence } = useUpdateChatPresence({
    chatId: id as string,
    nickname,
  });

  useEffect(() => {
    if (userPresence) {
      setPresence((currentPresence) => {
        return currentPresence.map((user) => {
          if (user.user_id === userPresence.user_id) return userPresence;

          return user;
        });
      });
    }
  }, [userPresence]);

  const userTyping = useMemo(() => {
    const user = presence.find((user) => user.status === "typing");

    if (user?.user_id === nickname) return;

    return user;
  }, [presence, nickname]);

  return (
    <PresenceContext.Provider value={{ presence, userTyping }}>
      {children}
    </PresenceContext.Provider>
  );
};

export const usePresence = () => {
  const context = useContext(PresenceContext);

  if (context === undefined) {
    throw new Error("usePresence must be used within a PresenceProvider");
  }

  return context;
};

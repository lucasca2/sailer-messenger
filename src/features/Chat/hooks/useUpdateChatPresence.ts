"use client";
import { useEffect, useState } from "react";
import { updateChatPresence } from "../api/updateChatPresence";
import { Presence } from "../api/getChatPresence";

type UseUpdateChatPresenceProps = {
  chatId: string;
  nickname: string;
};

export const useUpdateChatPresence = ({
  chatId,
  nickname,
}: UseUpdateChatPresenceProps) => {
  const [userPresence, setUserPresence] = useState<Presence>();
  const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
    await handleUpdatePresence("offline");
  };

  const handleWindowFocus = async (event: Event) => {
    await handleUpdatePresence("online");
  };

  const handleUpdatePresence = async (
    status: "online" | "offline" | "typing"
  ) => {
    const response = await updateChatPresence({
      id: chatId,
      user_id: nickname,
      status,
    });

    setUserPresence(response);
  };

  useEffect(() => {
    handleUpdatePresence("online");

    window.addEventListener("beforeunload", handleBeforeUnload);

    window.addEventListener(
      "focus",
      handleWindowFocus
    );

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener(
        "focus",
        handleWindowFocus
      );

      handleUpdatePresence("offline");
    };
  }, []);

  return { userPresence };
};

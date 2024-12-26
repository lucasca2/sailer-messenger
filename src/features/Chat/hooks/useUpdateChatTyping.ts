"use client";
import { useEffect, useRef, useState } from "react";
import { updateChatPresence } from "../api/updateChatPresence";
import { useDebounce } from "@/hooks/useDebounce";

type UseUpdateChatPresenceProps = {
  chatId: string;
  nickname: string;
};

export const useUpdateChatTyping = ({
  chatId,
  nickname,
}: UseUpdateChatPresenceProps) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleUpdatePresence = async (status: "online" | "typing") => {
    const response = await updateChatPresence({
      id: chatId,
      user_id: nickname,
      status,
    });
  };

  const handleTyping = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsTyping(true);

    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  }

  useEffect(() => {
    if (isTyping) {
      handleUpdatePresence("typing");
    } else {
      handleUpdatePresence("online");
    }
  }, [isTyping])

  return { setIsTyping: handleTyping};
};

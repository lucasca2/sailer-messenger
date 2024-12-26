"use client";
import { Input } from "@/components/Input/Input";

import styles from "./FormSendMessage.module.scss";
import { Icon } from "@/components/Icon/Icon";
import { useState } from "react";
import { sendMessage } from "@/features/Chat/api/sendMessage";
import { usePresence } from "@/features/Chat/provider/usePresence";
import { useUpdateChatTyping } from "@/features/Chat/hooks/useUpdateChatTyping";

type FormSendMessageProps = {
  nickname: string;
  chatId: string;
};

export const FormSendMessage = ({ nickname, chatId }: FormSendMessageProps) => {
  const { userTyping } = usePresence();
  const [message, setMessage] = useState("");

  const { setIsTyping } = useUpdateChatTyping({ chatId, nickname });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendMessage({
        chat_id: chatId,
        user_id: nickname,
        type: "text",
        content: message,
      });
      setMessage("");
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyping();
    setMessage(e.target.value);
  };

  const canSendMessage = message.length > 0;

  return (
    <form className={styles.wrapper} onSubmit={handleSendMessage}>
      {userTyping ? <span className={styles.userTyping}>{userTyping.user_id} is typing...</span> : null}
      <Input
        name="message"
        onChange={handleChange}
        placeholder="Type your message..."
        value={message}
      />
      <button type="submit" disabled={!canSendMessage}>
        <Icon name="send-01" />
      </button>
    </form>
  );
};

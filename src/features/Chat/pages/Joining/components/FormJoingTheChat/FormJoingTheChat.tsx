"use client";
import { Input } from "@/components/Input/Input";

import styles from "./FormJoingTheChat.module.scss";
import { Icon } from "@/components/Icon/Icon";
import { useState } from "react";
import { sendMessage } from "@/features/Chat/api/sendMessage";
import { Label } from "@/components/Label/Label";
import { Button } from "@/components/Button/Button";
import { saveNickname } from "@/features/Chat/actions/saveNickname";
import { useRouter } from "next/navigation";
import { joinTheChat } from "@/features/Chat/api/joinTheChat";

type FormJoingTheChatProps = {
  chatId: string;
  initialNickname?: string;
};

export const FormJoingTheChat = ({
  chatId,
  initialNickname = "",
}: FormJoingTheChatProps) => {
  const router = useRouter();
  const [nickname, setNickname] = useState(initialNickname);

  const handleJoinTheChat = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nickname) {
      return;
    }

    await saveNickname(nickname);
    await joinTheChat({ id: chatId, user_id: nickname });

    router.push(`/chat/${chatId}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const canJoinTheChat = !!nickname;

  return (
    <form className={styles.wrapper} onSubmit={handleJoinTheChat}>
      <Label>
        Your nickname
        <Input
          name="nickname"
          onChange={handleChange}
          placeholder="Type your nickname"
          value={nickname}
        />
      </Label>
      <Button type="submit" disabled={!canJoinTheChat}>
        Join the chat
        <Icon name="message-chat-square" />
      </Button>
    </form>
  );
};

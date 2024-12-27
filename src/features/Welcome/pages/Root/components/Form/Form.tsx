"use client";

import { Button } from "@/components/Button/Button";
import { Icon } from "@/components/Icon/Icon";
import { Input } from "@/components/Input/Input";
import { Label } from "@/components/Label/Label";
import styles from "./Form.module.scss";
import { useState } from "react";
import { saveNickname } from "@/features/Chat/actions/saveNickname";
import { createChat } from "@/features/Chat/api/createChat";
import { useRouter } from "next/navigation";

type FormProps = {
  initialValues: {
    nickname?: string;
  };
};

export const Form = ({ initialValues }: FormProps) => {
  const router = useRouter();
  const [nickname, setNickname] = useState<string>(
    initialValues?.nickname || ""
  );

  const handleCreateChat = async () => {
    if (!nickname) {
      return;
    }

    await saveNickname(nickname);
    const chat = await createChat({ participants: [nickname] });

    router.push(`/chat/${chat.chat_id}`);
  };

  const handleSetNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const canCreateChat = (nickname?.length || 0) > 0;

  return (
    <div className={styles.form}>
      <Label>
        Your nickname:
        <Input
          name="nickname"
          placeholder="Type your nickname"
          onChange={handleSetNickname}
          value={nickname}
        />
      </Label>
      <Button
        className={styles.button}
        onClick={handleCreateChat}
        disabled={!canCreateChat}
      >
        Start a new chat
        <Icon name="message-chat-square" />
      </Button>
    </div>
  );
};

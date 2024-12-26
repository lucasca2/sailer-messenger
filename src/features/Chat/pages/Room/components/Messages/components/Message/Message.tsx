import { classNames } from "@/utils/classNames";

import styles from "./Message.module.scss";
import dayjs from "dayjs";
import { Icon } from "@/components/Icon/Icon";
import { memo } from "react";
import Image from "next/image";

type MessageProps = {
  nickname: string;
  content: string;
  id: string;
  user_id: string;
  read: boolean;
  timestamp: string;
  type: "text" | "image" | "audio";
};

export const Message = memo(
  ({ nickname, content, id, user_id, read, timestamp, type }: MessageProps) => {
    console.log("message rendered >", content);
    const isOwnMessage = user_id === nickname;

    const rowClassName = classNames(styles.row, {
      [styles.row__yourself]: isOwnMessage,
    });

    return (
      <div key={id} className={rowClassName}>
        <span className={styles.nickname}>
          {isOwnMessage ? "you" : user_id}
        </span>

        <div className={styles.messageWrapper}>
          {isOwnMessage && read && <Icon name="check-circle" />}

          <div className={styles.message}>
            {type === "text" && content}
            {type === "image" && (
              <Image src={content} alt="image" className={styles.image} priority width={200} height={200} />
            )}
            {type === "audio" && (
              <audio controls>
                <source src={content} type="audio/mpeg" />
              </audio>
            )}
          </div>

          {!isOwnMessage && read && <Icon name="check-circle" />}
        </div>

        <span className={styles.timestamp}>
          {dayjs(timestamp).format("HH:mm")}
        </span>
      </div>
    );
  }
);

Message.displayName = "Message";

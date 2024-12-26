"use client";
import { Icon } from "@/components/Icon/Icon";

import styles from "./Header.module.scss";
import Link from "next/link";
import { classNames } from "@/utils/classNames";
import { usePresence } from "@/features/Chat/provider/usePresence";
import { useToast } from "@/components/Toast/hooks/useToast";

type HeaderProps = {
  owner: string;
  nickname: string;
};

export const Header = ({ owner, nickname }: HeaderProps) => {
  const { openToast } = useToast();
  const { presence } = usePresence();

  const handleClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    openToast({ message: "Link copied to clipboard", timeout: 1500 });
  };

  return (
    <div className={styles.header}>
      <Icon name="message-chat-square" />
      <span>{owner}‘s chat</span>
      <button className={styles.iconButton} onClick={handleClipboard}>
        <Icon name="share-07" />
      </button>
      <div className={styles.participants}>
        <Icon name="users-01" />
        <div className={styles.participantsList}>
          {presence?.map((user) => {
            const isOffline = user.status === "offline";
            const isYou = user.user_id === nickname;

            const participantStatusClassName = classNames(
              styles.participantStatus,
              {
                [styles.participantStatus__offline]: isOffline,
                [styles.participantStatus__online]: !isOffline,
              }
            );

            return (
              <span key={user.user_id} className={styles.participant}>
                <span className={participantStatusClassName} />
                {user.user_id} {isYou && "(You)"}
              </span>
            );
          })}
        </div>
      </div>
      <Link href={"/"}>
        <Icon name="x-close" />
      </Link>
    </div>
  );
};

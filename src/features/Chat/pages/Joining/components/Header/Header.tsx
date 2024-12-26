import { Icon } from "@/components/Icon/Icon";

import styles from "./Header.module.scss";
import Link from "next/link";

type HeaderProps = {
  owner: string;
};

export const Header = ({ owner }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <Icon name="message-chat-square" />
      <span>Joining the {owner}‘s chat</span>
      <Link href={"/"}>
        <Icon name="x-close" />
      </Link>
    </div>
  );
};

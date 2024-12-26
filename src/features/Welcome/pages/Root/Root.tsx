import { getNickname } from "@/features/Chat/actions/getNickname";
import { Form } from "./components/Form/Form";

import styles from "./Root.module.scss";
import { Icon } from "@/components/Icon/Icon";
import Link from "next/link";

export const Root = async () => {
  const storagedNickname = await getNickname();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        <Icon name="message-text-circle-02" />
        Sailer Messenger
      </h1>

      <Form
        initialValues={{
          nickname: storagedNickname,
        }}
      />
      <Link href="/chats">
        Join a existing chat
      </Link>
    </div>
  );
};

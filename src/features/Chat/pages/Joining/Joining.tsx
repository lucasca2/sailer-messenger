import { getNickname } from "../../actions/getNickname";
import { getChat } from "../../api/getChat";
import { Card } from "../../components/Card/Card";

import { FormJoingTheChat } from "./components/FormJoingTheChat/FormJoingTheChat";
import { Header } from "./components/Header/Header";

import styles from "./Joining.module.scss";

type JoiningProps = {
  id: string;
};

export const Joining = async ({ id }: JoiningProps) => {
  const chat = await getChat({ id });
  const nickname = await getNickname();

  const owner = chat.created_by;

  return (
    <div className={styles.wrapper}>
      <Card className={styles.card}>
        <Header owner={owner} />
        <FormJoingTheChat initialNickname={nickname} chatId={chat.chat_id} />
      </Card>
    </div>
  );
};

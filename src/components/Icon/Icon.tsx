import { classNames } from "@/utils/classNames";
import styles from "./Icon.module.scss";
import { MessageChatSquare } from "./icons/MessageChatSquare";
import { XClose } from "./icons/XClose";
import { Users01 } from "./icons/Users01";
import { Send01 } from "./icons/Send01";
import { CheckCircle } from "./icons/CheckCircle";
import { Share07 } from "./icons/Share07";
import { MessageTextCircle02 } from "./icons/MessageTextCircle02";

const icons = {
  ["message-chat-square"]: MessageChatSquare,
  ["x-close"]: XClose,
  ["users-01"]: Users01,
  ["send-01"]: Send01,
  ["check-circle"]: CheckCircle,
  ["share-07"]: Share07,
  ["message-text-circle-02"]: MessageTextCircle02,
};

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  className?: string;
};

export const Icon = ({ name, className: _className }: IconProps) => {
  const IconComponent = icons[name];

  const className = classNames(styles.icon, _className);

  return (
    <figure className={className}>
      <IconComponent />
    </figure>
  );
};

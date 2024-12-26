import { classNames } from "@/utils/classNames";

import styles from "./Card.module.scss";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className: _className }: CardProps) => {
  const className = classNames(styles.card, _className);

  return <div className={className}>{children}</div>;
};

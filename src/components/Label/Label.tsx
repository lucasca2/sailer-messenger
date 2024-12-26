import { classNames } from "@/utils/classNames";
import styles from "./Label.module.scss";

type LabelProps = {
  children: React.ReactNode;
  className?: string;
};

export const Label = ({ children, className: _className }: LabelProps) => {
  const className = classNames(styles.label, _className);

  return <label className={className}>{children}</label>;
};

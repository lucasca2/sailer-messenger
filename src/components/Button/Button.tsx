import { classNames } from "@/utils/classNames";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export const Button = ({
  children,
  onClick,
  type,
  disabled,
  className: _className,
}: ButtonProps) => {
  const className = classNames(styles.button, _className);

  return (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

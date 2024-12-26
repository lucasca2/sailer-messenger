import { classNames } from "@/utils/classNames";
import styles from "./Input.module.scss";

type InputProps = {
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  defaultValue?: string;
  value?: string;
};

export const Input = ({
  name,
  placeholder,
  onChange,
  defaultValue,
  value,
  className: _className,
}: InputProps) => {
  const className = classNames(styles.input, _className);

  return (
    <input
      className={className}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={defaultValue}
      value={value}
    />
  );
};

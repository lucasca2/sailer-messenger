import { useEffect, useState } from "react";

import styles from "./Toast.module.scss";

export interface ToastProps {
  message: string;
  timeout?: number;
  onClose?: () => void;
  error?: boolean;
  success?: boolean;
  priority?: boolean;
  title?: string;
}

export function Toast({
  title,
  message,
  timeout = 0,
  onClose,
}: ToastProps) {
  const [hide, setHide] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    const hideTimeout = setTimeout(() => {
      setHide(true);
    }, timeout);

    const closeTimeout = setTimeout(() => {
      onClose?.();
      setVisible(false);
    }, timeout + 300);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(closeTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  const className = [
    styles.wrapper,
    hide && styles.hide,
  ].join(" ");

  //
  return (
    <div className={className}>
      <div className={styles.content}>
        {title && (<span className={styles.title}>{title}</span>)}
        <span className={styles.message}>{message}</span>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";

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
  error,
  success,
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

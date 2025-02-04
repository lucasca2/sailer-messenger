import styles from "./Main.module.scss";

type MainProps = {
  children: React.ReactNode;
};

export const Main = ({ children }: MainProps) => {
  return <main className={styles.main}>{children}</main>;
};

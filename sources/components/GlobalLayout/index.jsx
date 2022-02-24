import styles from "./styles.module.scss";

export default function GlobalLayout ({ children }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}

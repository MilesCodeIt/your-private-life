import styles from "./styles.module.scss";

export default function GlobalLayout ({ children }) {

  return (
    <div className={styles.container}>
      <nav className={styles.taskbar}>

      </nav>
      <main>
        {children}
      </main>
    </div>
  );
}

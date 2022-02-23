import styles from "../../styles/styles.module.scss";

export default function GlobalLayout ({ children }) {

  return (
    <div className={styles.container}>
      <main>
        {children}
      </main>
      <nav className={styles.taskbar}>

      </nav>
    </div>
  );
}

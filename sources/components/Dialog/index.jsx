import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import styles from "./styles.module.scss";

export default function Dialog ({ children, show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const Container = () => (
    <div className={styles.backdrop}>
      <div className={styles.container}>

        {/** Potentiel waifu narratrice */}

        <div className={styles.content}>
          {children}
        </div>
        <div className={styles.buttons}>
          <button
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );

  if (!isBrowser) return null;
  return ReactDOM.createPortal(
    show ? <Container /> : null,
    document.getElementById("dialog-root")
  );
}
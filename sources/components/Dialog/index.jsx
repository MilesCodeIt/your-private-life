import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Fragment } from "react";
import create from "zustand";

import styles from "./styles.module.scss";

export const useDialog = create((set, get) => ({
  isOpen: false,
  content: <Fragment></Fragment>,
  open: (content) => set(() => ({ content, isOpen: true })),
  closeDialog: () => {
    set(() => ({ isOpen: false }));
    get().closeFunction && get().closeFunction();
  },
  closeFunction: null,
  setCloseFunction: (closeFunction) => set(() => ({ closeFunction }))
}));

export default function Dialog ({ children, show, onClose }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const dialog = useDialog();

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const Container = () => (
    <div className={styles.backdrop}>
      <div className={styles.container}>

        {/** Potentiel waifu narratrice */}

        <div className={styles.content}>
          {dialog.content}
        </div>
        <div className={styles.buttons}>
          <button
            onClick={dialog.closeDialog}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );

  if (!isBrowser) return null;
  return ReactDOM.createPortal(
    dialog.isOpen ? <Container /> : null,
    document.getElementById("dialog-root")
  );
}
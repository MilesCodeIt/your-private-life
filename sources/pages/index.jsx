import styles from "@/styles/home.module.scss";

import { CgBrowser } from "react-icons/cg";

export default function Home () {
  return (
    <div
      className={styles.container}
    >
      <div
        className={styles.item}
      >
        <CgBrowser size={28} />
      </div>
    </div>
  );
}

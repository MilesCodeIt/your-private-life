import styles from "./styles.module.scss";
import { Fragment } from "react";

import LoaderStartLogo from "@/components/LoaderStartLogo";

export default function GlobalLayout ({ children, isLoading = true }) {

  return (
    <Fragment>
      <div className={`${styles.loader} ${!isLoading ? styles.finished : ""}`}>
        <LoaderStartLogo finished={!isLoading} />
      </div>

      <div className={styles.container}>
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </Fragment>

  );
}

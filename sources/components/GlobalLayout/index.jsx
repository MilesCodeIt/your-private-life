import styles from "./styles.module.scss";
import { Fragment, useState, useEffect } from "react";

import LoaderStartLogo from "@/components/LoaderStartLogo";

export default function GlobalLayout ({ children, isLoading = true }) {
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [loaderFade, setLoaderFade] = useState(false);

  /**
   * On montre le fill du logo quand le loader est terminé.
   * Puis on fade le loader.
   */
  useEffect(() => {
    setTimeout(() => {
      if (isLoading) return;
      setLoaderFade(true);

      // 1s de fade.
      const animation_fade_out_time = 1000;
      setTimeout(() => {
        if (isLoading) return;
        setLoaderHidden(true);
      }, animation_fade_out_time);

    }, 2000);
  }, [isLoading]);

  return (
    <Fragment>
      <div className={`${styles.loader} ${loaderFade ? styles.fade : ""} ${loaderHidden ? styles.hidden : ""}`}>
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

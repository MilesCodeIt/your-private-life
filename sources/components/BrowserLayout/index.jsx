import Link from "next/link";

import styles from "./styles.module.scss";
import { CgClose, CgBrowser } from "react-icons/cg";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { AiFillLock } from "react-icons/ai";

export default function LevelsIndex ({ children, urlValue, browserTitle }) {
  return (
    <div className={styles.webBrowserContainer}>
      <div
        className={styles.applicationBarMenu}
      >
        <CgBrowser size={20} />
        <p>{browserTitle ?? "Navigateur Web"}</p>
        <Link href="/">
          <a className={styles.applicationBarMenu_closeIcon}>
            <CgClose size={20} />
          </a>
        </Link>
      </div>

      <header
        className={styles.webBrowserAddressBar}
      >
        <ul className={styles.webBrowserAddressBar_leftIcons}>
          <li><HiArrowLeft /></li>
          <li><HiArrowRight /></li>
        </ul>

        <div className={styles.webBrowserAddressBar_searchContainer}>
          <AiFillLock />

          <input
            type="text"
            value={urlValue ?? "about:blank"}
            readOnly={true}
          />
        </div>

      </header>

      <main className={styles.mainContentContainer}>
        {children}
      </main>
    </div>
  );
}
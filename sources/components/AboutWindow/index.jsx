import styles from "./styles.module.scss";

import { CgClose } from "react-icons/cg";

import { useRef } from "react";

export default function AboutWindow ({ closeWindow }) {
  const windowRef = useRef(null);

  const mouseMoveEvent = (mouseEvent) => {
    if (!windowRef.current) return;

    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();

    const screenWidth = document.body.clientWidth;
    const screenHeight = document.body.clientHeight;

    const mouseX = mouseEvent.clientX;
    const mouseY = mouseEvent.clientY;

    const windowTop = (mouseY + windowRef.current.clientHeight) < screenHeight
      ? mouseY + (windowRef.current.clientHeight / 2)
      : screenHeight - windowRef.current.clientHeight / 2;

    const windowLeft = (mouseX + windowRef.current.clientWidth / 2) < screenWidth
      ? mouseX
      : screenWidth - windowRef.current.clientWidth / 2;

    windowRef.current.style.top = (mouseY >= 0 ? windowTop : windowRef.current.clientHeight / 2) + "px";
    windowRef.current.style.left = (mouseX - windowRef.current.clientWidth / 2 >= 0 ? windowLeft : windowRef.current.clientWidth / 2) + "px";
  };

  const onMouseDownHandler = () => {
    document.addEventListener("mousemove", mouseMoveEvent);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", mouseMoveEvent);
    });
  };

  return (
    <div
      className={styles.windowContainer}
      ref={windowRef}
    >
      <nav
        onMouseDown={onMouseDownHandler}
        className={styles.windowNavbar}
      >
        <a
          className={styles.windowNavbar_closeIcon}
          onClick={closeWindow}
        >
          <CgClose />
        </a>
      </nav>
      <div className={styles.windowContent}>
        <h2>À propos</h2>
        <p>
          Projet pour les Trophées NSI proposé par des élèves du Lycée Turgot à Limoges.
        </p>

        <h3>But du projet</h3>
        <p>
          Prévention sur les risques liés aux cyberattaques.
        </p>

        <div
          style={{
            background: "#000",
            height: "64px",
            width: "48px"
          }}
        >

        </div>
      </div>
    </div>
  );
}
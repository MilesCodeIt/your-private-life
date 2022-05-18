import styles from "./styles.module.scss";

import { CgClose } from "react-icons/cg";

import { useRef } from "react";

export default function Window ({ closeWindow, children }) {
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
        {children}
      </div>
    </div>
  );
}
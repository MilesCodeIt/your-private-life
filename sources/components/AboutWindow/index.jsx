import styles from "./styles.module.scss";

import { CgClose } from "react-icons/cg";

import { useRef } from "react";

export default function AboutWindow ({ closeWindow }) {
  const windowRef = useRef(null);

  const mouseMoveEvent = (mouseEvent) => {
    if (!windowRef.current) return;
    mouseEvent.preventDefault();
    mouseEvent.stopPropagation();

    const rect = windowRef.current.getBoundingClientRect();

    const windowTop = mouseEvent.clientY - (mouseEvent.clientY - rect.top);
    const windowLeft = mouseEvent.clientX - (mouseEvent.clientX - rect.left);

    console.log(windowTop, windowLeft);

    windowRef.current.style.top = windowTop + "px";
    windowRef.current.style.left = windowLeft + "px";
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
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt qui omnis quidem corporis reprehenderit, voluptates suscipit commodi dignissimos? Molestiae numquam similique voluptate soluta dolorum recusandae dolores ab placeat est animi?</p>

      </div>
    </div>
  );
}
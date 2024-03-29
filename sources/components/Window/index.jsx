import styles from "./styles.module.scss";

import { CgClose } from "react-icons/cg";

import { useRef, useEffect } from "react";

export default function Window ({ closeWindow, children, width="300px", minHeight="100px" }) {
  const windowRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const elmnt = windowRef.current;
    console.info("window: opened");

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    navbarRef.current.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      pos3 = e.clientX;
      pos4 = e.clientY;

      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag (e) {
      e = e || window.event;

      const screenWidth = document.body.clientWidth;
      const screenHeight = document.body.clientHeight;

      if (!(e.clientX < 0 || e.clientX > screenWidth)) {
        pos1 = pos3 - e.clientX;
        pos3 = e.clientX;
      }

      if (!(e.clientY < 0 || e.clientY > screenHeight)) {
        pos2 = pos4 - e.clientY;
        pos4 = e.clientY;
      }

      // check to make sure the element will be within our viewport boundary
      var newLeft = elmnt.offsetLeft - pos1;
      var newTop = elmnt.offsetTop - pos2;

      if (!(newTop - (elmnt.clientHeight / 2) < 0
          || newTop + (elmnt.clientHeight / 2) > screenHeight
      )) {
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      }

      if (!(newLeft - (elmnt.clientWidth / 2) < 0
         || newLeft + (elmnt.clientWidth / 2) > screenWidth
      )) {
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }

    return () => {
      console.info("window: closed");
      closeDragElement();
    };
  }, []);

  return (
    <div
      className={styles.windowContainer}
      ref={windowRef}
      style={{ minHeight: minHeight, width: width }}
    >
      <nav
        ref={navbarRef}
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
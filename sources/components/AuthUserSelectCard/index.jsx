import { forwardRef } from "react";

import styles from "./styles.module.scss";
import UserAvatar from "@/components/UserAvatar";



const AuthUserSelectCard = forwardRef(({
  children, isSelected = false,
  onClick, href
}, ref) => {
  return (
    <a
      className={`${styles.card_container} ${isSelected ? styles.active : ""}`}
      href={href} onClick={onClick} ref={ref}
    >
      <UserAvatar
        size={50}
        firstLetter={children[0].toUpperCase()}
      />
      <span>
        {children}
      </span>
    </a>
  );
});

AuthUserSelectCard.displayName = "AuthUserSelectCard";
export default AuthUserSelectCard;
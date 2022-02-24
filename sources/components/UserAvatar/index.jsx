import styles from "./styles.module.scss";

export default function UserAvatar ({
  size = 100,
  firstLetter = "",
  customBackgroundImage = ""
}) {
  const additionnalBackgroundStyle = customBackgroundImage
    ? {
      backgroundImage: `url(${customBackgroundImage})`
    }
    : {};

  return (
    <div
      style={{
        height: size,
        width: size,
        ...additionnalBackgroundStyle
      }}
      className={styles.avatar}
    >
      {firstLetter &&
          <span
            style={{
              fontSize: size / 2.5
            }}
          >
            {firstLetter}
          </span>
      }
    </div>
  );
}
import styles from "@/styles/login.module.scss";

import { useState } from "react";
import Link from "next/link";

import { AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import UserAvatar from "@/components/UserAvatar";
import AuthUserSelectCard from "@/components/AuthUserSelectCard";

export default function Login () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  /** @param {import("react").FormEvent} event */
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.info("submitted", username, password);
  };

  return (
    <main
      className={styles.container}
    >
      <UserAvatar
        firstLetter="C"
      />

      <h2
        className={styles.formTitle}
      >
        Connexion
      </h2>

      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div>
          <AiOutlineUser
            size={28}
          />

          <input
            type="text"
            placeholder="Identifiant"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
          />
        </div>

        <div>
          <BiLockAlt
            size={28}
          />

          <input
            type={passwordIsVisible ? "text" : "password"}
            placeholder="Mot de passe"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
          />

          <a
            className={styles.passwordVisibilityIcon}
            onClick={() => setPasswordIsVisible(!passwordIsVisible)}
          >
            {passwordIsVisible
              ? <AiOutlineEye
                size={28}
              />
              : <AiOutlineEyeInvisible
                size={28}
              />
            }
          </a>
        </div>

        <button
          type="submit"
        >
          Connexion
        </button>
      </form>

      <nav
        className={styles.navbar}
      >
        <ul>
          <li>
            <AuthUserSelectCard
              isSelected={true}
            >
              Connexion
            </AuthUserSelectCard>
          </li>
          <li>
            <Link href="/signup" passHref>
              <AuthUserSelectCard>
                Inscription
              </AuthUserSelectCard>
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
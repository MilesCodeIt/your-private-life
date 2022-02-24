import styles from "@/styles/signup.module.scss";

import { useState } from "react";
import Link from "next/link";

import { AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import UserAvatar from "@/components/UserAvatar";
import AuthUserSelectCard from "@/components/AuthUserSelectCard";

import PasswordStrengthBar from "react-password-strength-bar";

export default function Signup () {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  /** @param {import("react").FormEvent} event */
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.info("submitted", username, password, email);
  };

  return (
    <main
      className={styles.container}
    >
      <UserAvatar
        firstLetter="I"
      />

      <h2
        className={styles.formTitle}
      >
        Inscription
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
          <AiOutlineUser
            size={28}
          />

          <input
            type="email"
            placeholder="Adresse E-mail"
            onChange={({ target }) => setEmail(target.value)}
            value={email}
          />
        </div>

        <div
          style={{
            borderBottom: !password
              ? "none"
              : `6px solid ${
                // Très bas
                passwordScore === 0 ? "#FF4242"
                  // Bas
                  : passwordScore === 1 ? "#F58840"
                    // Moyen
                    : passwordScore === 2 ? "#FFD32D"
                      // Haut
                      : "#2EB086"
              }`
          }}
        >
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

        <PasswordStrengthBar
          style={{
            display: "none"
          }}
          minLength={8}
          password={password}
          onChangeScore={(score) => {
            setPasswordScore(score);
          }}
        />

        <button
          type="submit"
        >
          S&apos;inscrire
        </button>
      </form>

      <nav
        className={styles.navbar}
      >
        <ul>
          <li>
            <Link href="/login" passHref>
              <AuthUserSelectCard>
                Connexion
              </AuthUserSelectCard>
            </Link>
          </li>
          <li>
            <AuthUserSelectCard
              isSelected={true}
            >
              Inscription
            </AuthUserSelectCard>
          </li>
        </ul>
      </nav>
    </main>
  );
}
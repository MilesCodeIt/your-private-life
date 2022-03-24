import styles from "@/styles/signup.module.scss";

import Link from "next/link";
import { useState } from "react";
import ky, { HTTPError } from "ky";
import { useRouter } from "next/router";

import { AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import UserAvatar from "@/components/UserAvatar";
import AuthUserSelectCard from "@/components/AuthUserSelectCard";

import PasswordStrengthBar from "react-password-strength-bar";

export default function Signup () {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  /** @param {import("react").FormEvent} event */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Réinitialisation du message d'erreur.
    setErrorMessage(null);
    setLoading(true);

    try {
      await ky.post("/api/user/signup", {
        json: {
          username,
          password
        }
      }).json();

      setLoading(false);
      router.push("/login?created_account=1");
    }
    catch (error) {
      setLoading(false);

      if (error instanceof HTTPError) {
        const body = await error.response.json();
        setErrorMessage(body.message);
      }
      else {
        setErrorMessage("Une erreur côté serveur est survenue !");
        console.error(error);
      }
    }
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
            placeholder="Nom d'utilisateur"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
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
          disabled={loading}
          type="submit"
        >
          {loading ? "Chargement..." : "S'inscrire"}
        </button>

        {errorMessage &&
          <span
            className={styles.errorMessage}
          >
            {errorMessage}
          </span>
        }
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
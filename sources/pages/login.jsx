import styles from "@/styles/login.module.scss";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import ky, { HTTPError } from "ky";
import useUser from "@/utils/web/useUser";

import { AiOutlineUser, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";

import UserAvatar from "@/components/UserAvatar";
import AuthUserSelectCard from "@/components/AuthUserSelectCard";

export default function Login () {
  const { mutate } = useUser();
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const [infoMessage, setInfoMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  /** @param {import("react").FormEvent} event */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Réinitialisation du message d'erreur.
    setErrorMessage(null);
    setLoading(true);

    try {
      const data = await ky.post("/api/user/login", {
        json: {
          uid,
          password
        }
      }).json();

      const user_data = data.user;
      setLoading(false);

      console.info("Mis à jour des données de l'état de l'utilisateur.", user_data);
      mutate(user_data);
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

  useEffect(() => {
    const query = router.query;
    if (query.created_account) {
      setInfoMessage("Compte crée avec succès ! Connectez-vous avec.");
    }
  }, [router.query]);

  return (
    <main className={styles.container}>
      <UserAvatar firstLetter="C" />

      <h2
        className={styles.formTitle}
      >
        Connexion
      </h2>

      {infoMessage &&
        <span>
          {infoMessage}
        </span>
      }

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
            placeholder="Identifiant ou E-Mail"
            onChange={({ target }) => setUid(target.value)}
            value={uid}
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
          {loading ? "..." : "Se connecter"}
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
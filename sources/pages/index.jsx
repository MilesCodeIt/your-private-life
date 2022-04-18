import styles from "@/styles/home.module.scss";

import { CgBrowser } from "react-icons/cg";
import { RiUserSettingsLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { useState, Fragment } from "react";
import Link from "next/link";

import useUser from "@/utils/web/useUser";
import useUserLevels from "@/utils/web/useUserLevels";
import AboutWindow from "@/components/AboutWindow";

export default function Home () {
  const [showAbout, setShowAbout] = useState(false);
  const { levels, loading } = useUserLevels();

  /**
   * Affichage d'un loader si les données
   * de l'utilisateur sont toujours en chargement.
   */
  if (loading) return (
    <p>
      Chargement...
    </p>
  );

  const applications = [
    {
      name: "À propos",
      click: () => setShowAbout(true),
      icon: <AiOutlineInfoCircle size={38} />
    },
    {
      name: "Déconnexion",
      link: "/logout",
      icon: <BiLogOut size={38} />
    }
  ];

  (levels.introduction) ? applications.unshift(
    {
      name: "Niveaux",
      link: "/levels",
      icon: <CgBrowser size={38} />
    },
    {
      name: "Mon Compte",
      link: "/user",
      icon: <RiUserSettingsLine size={38} />
    }
  ) : applications.unshift(
    {
      name: "Mes mails",
      link: "/levels/introduction",
      icon: <CgBrowser size={38} />
    }
  );

  return (
    <Fragment>
      {!levels.introduction && (
        <Link href="/levels/introduction">
          <a className={styles.introduction_mail}>
            <h3>Nouveau mail</h3>
            <p>Cliquez-ici pour afficher le contenu du mail.</p>
          </a>
        </Link>
      )}

      <div className={styles.container}>
        {applications.map((application) => (
          (application.link ? (
            <Link
              key={application.name}
              href={application.link}
            >
              <a
                className={styles.item}
              >
                {application.icon}
                <span>
                  {application.name}
                </span>
              </a>
            </Link>
          ) : (
            <a
              key={application.name}
              onClick={application.click}
              className={styles.item}
            >
              {application.icon}
              <span>
                {application.name}
              </span>
            </a>
          )
          )))}
      </div>

      {showAbout && <AboutWindow
        closeWindow={() => setShowAbout(false)}
      />}
    </Fragment>
  );
}

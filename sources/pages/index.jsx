import styles from "@/styles/home.module.scss";

import { CgBrowser } from "react-icons/cg";
import { RiUserSettingsLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { useState, Fragment } from "react";
import Link from "next/link";

import useUser from "@/utils/web/useUser";
import AboutWindow from "@/components/AboutWindow";

export default function Home () {
  const [showAbout, setShowAbout] = useState(false);
  const { user } = useUser();

  const applications = [
    {
      name: "Navigateur Web",
      link: "/levels",
      icon: <CgBrowser size={38} />
    },
    {
      name: "Mon Compte",
      link: "/user",
      icon: <RiUserSettingsLine size={38} />
    },
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

  console.log(user);

  return (
    <Fragment>
      <div className={styles.container}>
        {applications.map((application) => (
          (application.link ? (
            <Link href={application.link} key={application.name}>
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

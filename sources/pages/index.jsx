import styles from "@/styles/home.module.scss";

import { CgBrowser } from "react-icons/cg";
import { RiUserSettingsLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";

import Link from "next/link";

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
    link: "/about",
    icon: <AiOutlineInfoCircle size={38} />
  },
  {
    name: "Déconnexion",
    link: "/logout",
    icon: <BiLogOut size={38} />
  }
];

export default function Home () {
  return (
    <div
      className={styles.container}
    >
      {applications.map((application) => (
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
      ))}
    </div>
  );
}

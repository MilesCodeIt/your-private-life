import styles from "./styles.module.scss";

import Window from "@/components/Window";

export default function AboutWindow ({ closeWindow }) {

  return (
    <Window closeWindow={closeWindow}>
      <h2>À propos</h2>
      <p>
        Projet pour les Trophées NSI proposé par des élèves du Lycée Turgot à Limoges.
      </p>

      <h3>But du projet</h3>
      <p>
        Prévention sur les risques liés aux cyberattaques.
      </p>

      <div
        style={{
          background: "#000",
          height: "64px",
          width: "48px"
        }}
      >

      </div>
    </Window>
  );
}
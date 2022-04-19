import Link from "next/link";
import { useState } from "react";

import BrowserLayout from "@/components/BrowserLayout";

import styles from "@/styles/levels/index.module.scss";

const raw_levels = [
  {
    name: "Introduction",
    description: "Tutoriel d'introduction à Your Private Life. Analysez vos mails et triez les. Attention, les spams ne sont pas triés !",
    id: "introduction"
  },
  {
    name: "Ami de longue date",
    description: "Êtes-vous sûr de savoir à qui vous parlez sur les réseaux ?",
    id: "ami-de-longue-date"
  }
];

export default function LevelsIndex () {
  const [searchLevel, setSearchLevel] = useState("");
  const [levels, setLevels] = useState(raw_levels);

  /** @param {React.ChangeEvent} event */
  const handleSearch = (event) => {
    const to_search = event.target.value;
    setSearchLevel(to_search);

    if (to_search && to_search.trim().length > 0) {
      /** @param {string} value */
      const filter = (value) => value.toLowerCase().includes(to_search.toLowerCase());

      // On effectue une recherche par nom, id et description.
      const filtered_levels = raw_levels.filter(level =>
        filter(level.name) || filter(level.description) || filter(level.id)
      );

      setLevels(filtered_levels);
    }
    else {
      setLevels(raw_levels);
    }
  };

  return (
    <BrowserLayout
      browserTitle="Niveaux"
      urlValue={`://levels${searchLevel ? `?search=${encodeURIComponent(searchLevel)}` : ""}`}
    >
      <div className={styles.header}>
        <input
          type="text"
          placeholder="Rechercher un niveau"
          value={searchLevel}
          onChange={handleSearch}
        />

        <button>
          Suggérer un niveau
        </button>
      </div>

      <div className={styles.levels}>
        {levels.map(level => (
          <Link key={level.id} href={`/levels/${level.id}`} passHref>
            <a className={styles.levels_item}>
              <h3>{level.name}</h3>
              <span>{level.description}</span>
            </a>
          </Link>
        ))}
      </div>
    </BrowserLayout>
  );
}
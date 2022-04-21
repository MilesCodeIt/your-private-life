import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";

// Stores.
import useUser from "@/utils/web/useUser";
import useUserLevels from "@/utils/web/useUserLevels";

import styles from "styles/user.module.scss";

export default function User () {
  const { user } = useUser();
  const { levels } = useUserLevels();

  const [parsedLevels, setParsedLevels] = useState({
    finished: [],
    unfinished: []
  });

  useEffect(() => {
    if (!levels) return;

    // On transforme l'objet levels en tableau.
    const levels_array = Object.keys(levels).map((key) => ({
      id: key,
      isFinished: levels[key]
    }));

    // On filtre l'array pour ne garder que les niveaux terminés et non terminés.
    const finished = levels_array.filter(({ isFinished }) => isFinished);
    const unfinished = levels_array.filter(({ isFinished }) => !isFinished);

    setParsedLevels({
      finished,
      unfinished
    });
  }, [levels]);

  if (!user || !levels) return (
    <Fragment>
      <NextSeo
        title="Chargement..."
      />
      <p>
        Chargement des données...
      </p>
    </Fragment>
  );

  return (
    <Fragment>
      <NextSeo
        title="Mon compte"
      />

      <div className={styles.container}>
        <Link href="/" passHref>
          <a className={styles.goBackButton}>
          Revenir à la page d&apos;accueil
          </a>
        </Link>

        <div className={styles.window}>
          <h1>Bievenue sur votre compte, {user.username} !</h1>

          <p>Vous avez terminé {parsedLevels.finished.length} niveau(x).</p>
        </div>

        <div className={styles.window}>
          <h2>Niveaux terminé(s)</h2>

          {parsedLevels.finished.map(level => (
            <div key={level.id}>
              <p>- {level.id}</p>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}
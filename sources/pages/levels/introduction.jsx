import BrowserLayout from "@/components/BrowserLayout";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import { useDialog } from "@/components/Dialog";
import { updateLevelState } from "@/utils/web/useUserLevels";

import styles from "@/styles/levels/introduction.module.scss";

const mails = [
  {
    author: "Colissimo",
    title: "Votre colis vient d'être expédié !",
    content: <div>
      <h2>Commande - #NVRGNNAGVYUP1</h2>

      <p>Nous venons d&apos;envoyer votre colis. Il devrait arriver dans 2, ou 3 jours.</p>
    </div>,

    realChoice: "spam",
    explanations: <p>
      Ce genre de message est récurrent car...
    </p>
  },
  {
    author: "Banque Postale",
    title: "Une importante notification",
    content: <div>
      <h2></h2>
    </div>,

    realChoice: "lu",
    explanations: <p>
      Ce message n&apos;a rien de suspect et l&apos;adresse e-mail de l&apos;expéditeur correspond bien.
    </p>
  },
  {
    author: "Jelly",
    title: "Tuto des noeuds",
    content: <div>
      <p>
        Salut,
        <br />Du coup je t&apos;envoie la vidéo parce qu&apos;elle est trop grosse pour passer par Insta ou Discord 💀🤌
        <br /> <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">
          https://www.youtube.com/watch?v=dQw4w9WgXcQ
        </a>
        <br />C&apos;est dur la vie de pauvre.

        <br /><br />Votre très estimée, <i>The Great Jelly</i>.
      </p>
    </div>
  },
  {
    author: "spotify.bot1.rest25E3f1@hak.ru",
    title: "TRÈS URGENT !!",
    content: <div>
      <h2>Bonjour, veuillez lire ce message avec la plus haute attention.</h2>

      <p>
        Nous avons trouvé une erreur dans les informations
        de votre compte Soundable.
      </p>

      <p>
        Pour réctifier cette erreur, veuillez cliquer sur le bouton ci-dessous.
      </p>

      <a >
        Accéder à mon compte
      </a>
    </div>
  },
  {
    author: "Twitch",
    title: "Votre récapitulatif 2021 #TwitchRecap",
    content: <div>
      <h2>2021 #TwitchRecap</h2>

      <p>Messages envoyés: <b>727</b></p>
      <p>Top des chaînes les plus regardées: sardoche ; locklear ; squeezie</p>
      <p>Points de chaînes gagnés: <b>133,337</b></p>
    </div>
  },
  {
    author: "Inconnu",
    title: "Mon héritage",
    content: <div>
      <p>Bonjour, je suis Pierre.</p>
      <p>j&apos;aimerais vous faire part de mon héritage car je sais bientôt mourrir</p>
      <p>Je ne vous connais pas, mais votre adresse mail m&apos;a inspiré confiance</p>
      <p>Vous avez de la chance, je possède 80 milliards d&apos;euros, mais y a évidemment un peu de paperasse.</p>
      <p>Mais vous inquiétez pas, tout se trouve sur le lien suivant: <a href="#" onClick={(e) => e.preventDefault()}>http://sitedeconfiance.com/arnaque.php</a></p>
      <p>Merci mon cher, et portez vous bien.</p>
    </div>
  }
];

export default function IntroductionLevel () {
  const navigate = useRouter().push;

  const [selectedMail, setSelectedMail] = useState(mails[0]);
  const dialog = useDialog();

  const [correctAnswers, setCorrectAnswers] = useState(0);

  // Dialogue affiché au chargement de la page.
  useEffect(() => {
    /**
     * Contient le JSX des dialogues.
     * Le messgae de bienvenue est ici utilisé en état par défaut.
     */
    dialog.open(
      <p>
        Bienvenue ! Vous venez de recevoir plusieurs mails et vous devez les trier. <br />
        <b>Analysez-les</b> bien, avant de cliquer sur un lien ou une image, par exemple.
      </p>
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler des dialogues.
  // Si c'est le dernier mail, on affiche les résultats.
  // Si les résultats on déjà été affichés, on redirige à la page d'accueil.
  useEffect(() => {
    dialog.setCloseFunction(() => {
      if (selectedMail === "end") {
        showEndDialog();
        return;
      }

      if (selectedMail === "navigate") {
        updateLevelState("introduction", true)
          .then((result) => {
            if (result.success) {
              console.info("[introduction] Avancement de l'état du niveau sauvegardé !");
              navigate("/?from=introduction&finished=true");
            }
            else {
              console.error("[introduction] Erreur lors de la sauvegarde de l'état du niveau !");
            }
          });

        return;
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMail]);

  const MailItem = ({ mail }) => (
    <div className={`${styles.mailItem} ${mail === selectedMail ? styles.mailItem_selected : ""}`}>
      <span className={styles.mailItem_author}>{mail.author}</span>
      <h3 className={styles.mailItem_title}>{mail.title}</h3>
    </div>
  );

  /**
   * Function qui permet de passer au prochain mail et de
   * savoir si on doit afficher le dialogue de fin ou non.
   * @param {"lu" | "spam"} userChoice - Contient le choix de l'utilisateur.
   */
  const nextMail = (userChoice) => {
    const current_mail_index = mails.findIndex(mail => mail === selectedMail);
    const next_mail_index = current_mail_index + 1;

    // On vérifie si le choix de l'utilisateur est correct ou non.
    const choiceIsCorrect = userChoice === selectedMail.realChoice;
    setCorrectAnswers(choiceIsCorrect ? correctAnswers + 1 : correctAnswers);

    // Affichage du dialogue.
    dialog.open(
      <Fragment>
        <p>{choiceIsCorrect ? "Bravo !" : "Incorrect."}</p>
        {selectedMail.explanations}
      </Fragment>
    );

    // Si on a fini, on affiche le dialogue de fin.
    const isLastMail = next_mail_index === mails.length;
    if (isLastMail) {
      setSelectedMail("end");
      return;
    }

    // Sinon on passe au mail suivant.
    const next_mail_data = mails[next_mail_index];
    setSelectedMail(next_mail_data);
  };

  const showEndDialog = () => {
    setSelectedMail("navigate");
    dialog.open(
      <div>
        <p>
          Bravo ! Vous avez terminé le niveau avec {correctAnswers} réponse(s) correcte(s).
        </p>
        <p>
          Vous voulez rejouer ce niveau ? Aucun problème ! Cliquez sur l&apos;icône &quot;Niveaux&quot; dans l&apos;accueil.
        </p>
      </div>
    );
  };

  return (
    <Fragment>
      <Head>
        <title>Mes mails - Your Private Life</title>
      </Head>

      <BrowserLayout
        urlValue="https://my.randmail.com/inbox"
        browserTitle={`Mes mails - ${selectedMail.title}`}
      >
        <div className={styles.container}>
          <div className={styles.mailContainer}>
            {mails.map((mailItem, mailIndex) => (
              <MailItem mail={mailItem} key={mailIndex} />
            ))}
          </div>

          <div className={styles.mailSelectedContainer}>
            {selectedMail && (typeof selectedMail === "object") && (
              <Fragment>
                <div>
                  <h2>{selectedMail.title}</h2>
                  <span><b>{selectedMail.author}</b> à moi.</span>
                </div>

                <div className={styles.mailSelectedContainer_content}>
                  {selectedMail.content}

                  <div className={styles.mailItem_buttons}>
                    <button
                      onClick={() => nextMail("lu")}
                      className={styles.mailItem_buttons_read}
                    >
                      Passer au prochain mail
                    </button>
                    <button
                      onClick={() => nextMail("spam")}
                      className={styles.mailItem_buttons_spam}
                    >
                      Signaler comme spam
                    </button>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </BrowserLayout>
    </Fragment>
  );
}
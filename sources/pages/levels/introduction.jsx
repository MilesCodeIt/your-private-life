import BrowserLayout from "@/components/BrowserLayout";
import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import Dialog from "@/components/Dialog";

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
    </div>
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
  const [dialogShow, setDialogShow] = useState(true);

  // const []

  /**
   * Contient le JSX des dialogues.
   * Le messgae de bienvenue est ici utilisé en état par défaut.
   */
  const [dialogText, setDialogText] = useState(
    <p>
      Bienvenue ! Vous venez de recevoir plusieurs mails et vous devez les trier. <br />
      <b>Analysez-les</b> bien, avant de cliquer sur un lien ou une image, par exemple.
    </p>
  );

  const MailItem = ({ mail }) => (
    <div className={`${styles.mailItem} ${mail === selectedMail ? styles.mailItem_selected : ""}`}>
      <span className={styles.mailItem_author}>{mail.author}</span>
      <h3 className={styles.mailItem_title}>{mail.title}</h3>
    </div>
  );

  /**
   * @param {"lu" | "spam"} userChoice - Contient le choix de l'utilisateur.
   */
  const nextMail = (userChoice) => {
    const current_mail_index = mails.findIndex(mail => mail === selectedMail);
    const next_mail_index = current_mail_index + 1;

    // Affichage du dialogue.
    const choiceIsCorrect = userChoice === selectedMail.realChoice;
    setDialogText(
      <Fragment>
        <p>{choiceIsCorrect ? "Bravo !" : "Incorrect."}</p>
        {selectedMail.explanations}
      </Fragment>
    );

    setDialogShow(true);

    const isLastMail = next_mail_index === mails.length;
    if (isLastMail) {
      setSelectedMail("end");
      return;
    }

    const next_mail_data = mails[next_mail_index];
    setSelectedMail(next_mail_data);
  };

  const showEndDialog = () => {
    setSelectedMail("navigate");
    setDialogText(
      <p>
        Bravo ! Vous avez terminé le niveau.
      </p>
    );

    setDialogShow(true);
  };

  return (
    <Fragment>
      <Head>
        <title>Mes mails - Your Private Life</title>
      </Head>

      <Dialog
        show={dialogShow}
        onClose={() => {
          if (selectedMail === "end") {
            setDialogShow(false);
            showEndDialog();
            return;
          }

          if (selectedMail === "navigate") {
            setDialogShow(false);
            navigate("/");
            return;
          }

          setDialogShow(false);
        }}
      >
        {dialogText}
      </Dialog>

      <BrowserLayout
        urlValue="https://my.randmail.com/inbox"
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
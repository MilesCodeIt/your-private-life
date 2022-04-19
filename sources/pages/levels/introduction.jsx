import BrowserLayout from "@/components/BrowserLayout";
import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import { useDialog } from "@/components/Dialog";
import { updateLevelState } from "@/utils/web/useUserLevels";

import styles from "@/styles/levels/introduction.module.scss";

const mails = [
  {
    author: "Colissito <coli.ssito24e@318735tdmail.fr",
    title: "Votre colis est en route",
    content: <div className={styles.mails_1}>
      <h2>Commande - #NVRGNNAGVYUP1</h2> <br />

      <p className={styles.mails_1__status}>
        Statut: en attente au centre de distribution.
      </p>

      <p>
        <b>Paiment manquant de 2 euros.</b> <br />
        Votre colis sera envoyé lorsque le montant sera payé.
      </p>

      <button className={styles.mails_1__button}>
        Livraison payante
      </button>
    </div>,

    realChoice: "spam",
    explanations: <p>
      Ce genre de message est récurrent.
      Dans ces mails, on vous fait croire qu&apos;un colis
      doit vous parvenir mais cela uniquement si vous payez
      un certain montant. De plus, l&apos;adresse e-mail de l&apos;auteur
      semble suspect et peut être un spam.
    </p>
  },
  {
    author: "Jelly <jelly@randmail.com>",
    title: "Tuto des noeuds",
    content: <div className={styles.mails_2}>
      <p>
        Salut,
        <br />Du coup je t&apos;envoie la vidéo parce qu&apos;elle est trop grosse pour passer par Insta ou Discord 💀🤌
        <br /> <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noreferrer">
          https://www.youtube.com/watch?v=dQw4w9WgXcQ
        </a>
        <br />C&apos;est dur la vie de pauvre.

        <br /><br />Votre très estimée, <i>The Great Jelly</i>.
      </p>
    </div>,

    realChoice: "lu",
    explanations: <p>
      Cet e-mail n&apos;a rien de suspect et
      semblerait provenir d&apos;un de vos amis.
    </p>
  },
  {
    author: "Soundable <soundable.bot1.rest25E3f1@hak.ru>",
    title: "TRÈS URGENT !!",
    content: <div className={styles.mails_3}>
      <h2>Bonjour, veuillez lire ce message avec la plus haute attention.</h2>

      <p>
        Nous avons trouvé une erreur dans les informations
        de votre compte Soundable.
      </p> <br />

      <p>
        Pour réctifier cette erreur, <b>veuillez cliquer sur le bouton ci-dessous</b>.
      </p> <br /> <br />

      <a className={styles.mails_3__button}>
        Accéder à mon compte
      </a>
    </div>,

    realChoice: "spam",
    explanations: <p>
      Cet e-mail est un spam et essaye de vous faire croire
      qu&apos;une erreur s&apos;est produite sur un de vos compte et vous demande
      de vous y connecter pour réparer l&apos;erreur.
      En réalité, c&apos;est complétement faux et ce mail essaye
      sûrement de récupérer vos identifiants de connexion.
    </p>
  },
  {
    author: "Twitch <insights@twitch.tv>",
    title: "Votre récapitulatif 2021 #TwitchRecap",
    content: <div className={styles.mails_4}>
      <h2>2021 #TwitchRecap</h2>

      <p>Messages envoyés: <b>727</b></p>
      <p>Points de chaînes gagnés: <b>133,337</b></p>

      <p>Top des chaînes les plus regardées</p>
      <ul>
        <li>Sardouche</li>
        <li>Unlocklear</li>
        <li>SqueezIt</li>
      </ul>

      <button>Voir le reste du récapitulatif</button>
    </div>,

    realChoice: "lu",
    explanations: <p>
      Ce mail provient d&apos;un réseau auquel vous êtes inscris.
      Il n&apos;est donc en aucun cas un spam, de plus l&apos;adresse e-mail
      de l&apos;expéditeur semble correcte.
    </p>
  },
  {
    author: "Inconnu <pierre.durif@randmail.com",
    title: "Mon héritage",
    content: <div className={styles.mails_5}>
      <div className={styles.mails_spam}>
        Ce message semble être un spam.
      </div>

      <p>Bonjour, je suis Pierre.</p>
      <p>J&apos;aimerais vous faire part de mon héritage car je sais bientôt mourrir</p>
      <p>Je ne vous connais pas, mais votre adresse mail m&apos;a inspiré confiance</p>
      <p>Vous avez de la chance, je possède <b>80 milliards d&apos;euros</b>, mais y a évidemment un peu de paperasse.</p>
      <p>Mais vous inquiétez pas, tout se trouve sur le lien suivant: <a href="#" onClick={(e) => e.preventDefault()}>http://sitedeconfiance.com/arnaque.php</a></p>
      <br />
      <p>Merci mon cher, et portez vous bien.</p>
    </div>,

    realChoice: "spam",
    explanations: <p>
      Bien que l&apos;adresse e-mail a l&apos;air sans risque, un
      message de notre boîte mail nous informe du risque potentiel.
      Cela veut dire que cette adresse e-mail a des antécédents
      de spam et plusieurs personnes l&apos;ont signalés.
      Ainsi, il vaudrait mieux éviter de garder ce mail et de cliquer
      sur les liens qu&apos;il contient.
    </p>
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
    // On vérifie si le choix de l'utilisateur est correct ou non.
    const choiceIsCorrect = userChoice === selectedMail.realChoice;
    setCorrectAnswers(choiceIsCorrect ? correctAnswers + 1 : correctAnswers);

    // On supprime le mail de la liste.
    mails.shift();

    // Affichage du dialogue.
    dialog.open(
      <Fragment>
        <p>{choiceIsCorrect ? "Bravo !" : "Incorrect."}</p>
        {selectedMail.explanations}
      </Fragment>
    );

    // Si on a fini, on affiche le dialogue de fin.
    const isLastMail = mails.length <= 0;
    if (isLastMail) {
      setSelectedMail("end");
      return;
    }

    // Sinon on passe au mail suivant.
    const next_mail_data = mails[0];
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
        browserTitle={`Mes mails ${selectedMail.title ? `- ${selectedMail.title}` : ""}`}
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
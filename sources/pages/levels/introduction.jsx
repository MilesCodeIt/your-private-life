import BrowserLayout from "@/components/BrowserLayout";
import { Fragment, useState } from "react";
import Head from "next/head";

import Dialog from "@/components/Dialog";

import styles from "@/styles/levels/introduction.module.scss";

const mails = [
  {
    author: "Colissimo",
    title: "Votre colis vient d'être expédié !",
    content: <Fragment>
      <h2>Commande - #NVRGNNAGVYUP1</h2>

      <p>Nous venons d&apos;envoyer votre colis. Il devrait arriver dans 2, ou 3 jours.</p>
    </Fragment>
  },
  {
    author: "Banque Postale",
    title: "Une importante notification",
    content: <Fragment>
      <h2></h2>
    </Fragment>
  },
  {
    author: "spotify.bot1.rest25E3f1@hak.ru",
    title: "TRÈS URGENT !!",
    content: <Fragment>
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
    </Fragment>
  },
  {
    author: "Twitch",
    title: "Votre récapitulatif 2021 #TwitchRecap",
    content: <Fragment>
      <h2>2021 #TwitchRecap</h2>

      <p>Messages envoyés: <b>727</b></p>
      <p>Top des chaînes les plus regardées: sardoche ; locklear ; squeezie</p>
      <p>Points de salon gagnés: <b>133,337</b></p>
    </Fragment>
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
  const [selectedMail, setSelectedMail] = useState(null);
  const [dialogShow, setDialogShow] = useState(true);

  const MailItem = ({ mail }) => (
    <div className={`${styles.mailItem} ${mail === selectedMail ? styles.mailItem_selected : ""}`} onClick={() => setSelectedMail(mail)}>
      <span className={styles.mailItem_Author}>{mail.author}</span>
      <h3 className={styles.mailIte_Title}>{mail.title}</h3>
    </div>
  );

  return (
    <Fragment>
      <Head>
        <title>Mes mails - Your Private Life</title>
      </Head>

      <Dialog
        show={dialogShow}
        onClose={() => setDialogShow(false)}
      >
        <p>
          Vous avez <b>{mails.length}</b> mails.
        </p>
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
            {selectedMail && (
              <Fragment>
                <div className={styles.mailSelectedContainer_headers}>
                  <h2>{selectedMail.title}</h2>
                  <span><b>{selectedMail.author}</b> à moi.</span>
                </div>

                <div>
                  {selectedMail.content}
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </BrowserLayout>
    </Fragment>
  );
}
import Link from "next/link";
import { NextSeo } from "next-seo";
import Image from "next/image";

import { Fragment, useState, useRef, useEffect } from "react";
import Window from "@/components/Window";

import { IoMdClose } from "react-icons/io";
import styles from "@/styles/levels/rigole-je-connais-ton-ip.module.scss";

import useUser from "@/utils/web/useUser";
import ky from "ky";

const friend_name = "[Faze] XxX_InconnuDu87_XxX";
const friends = [
  {
    name: friend_name,
    online: true
  },
  {
    name: "JellyCat",
    online: false
  },
  {
    name: "Vexcited",
    online: true
  },
  {
    name: "_Zenyth_",
    online: true
  },
  {
    name: "yonna",
    online: false
  },
  {
    name: "Invertime",
    online: false
  }
];

const MessageItem = ({
  author,
  content,
  data
}) => {
  let content_element = <p>{content}</p>;

  // Mettre un GIF pour la réponse `Au revoir`
  // à la response_index: 0.
  if (data && data === "{AU_REVOIR_GIF}")  {
    content_element = <div style={{
      "position": "relative",
      "height": "300px",
      "width": "400px"
    }}>
      <Image
        src="https://c.tenor.com/IEeCGLXnRpkAAAAC/au-revoir-giscard.gif"
        alt="Au revoir."
        layout="fill"
        objectFit="contain"
      />
    </div>;
  }

  return (
    <div className={styles.message_item}>
      <h4>{author}</h4>
      {content_element}
    </div>
  );
};

const FriendItem = ({
  name,
  online,
  selected = false
}) => (
  <div className={`${styles.friend_item} ${selected ? styles.friend_item__selected : ""}`}>
    <h4>{name}</h4>
    <div>
      <span className={online ? styles.onlineDot : styles.offlineDot}>{}</span>
      <p>{online ? "En ligne" : "Hors-ligne"}</p>
    </div>
  </div>
);

export default function RigoleJeConnaisTonIpLevel () {
  /**
   * Chaque objet est une réponse qui contient les choix.
   * Quand un choix est fait, on passe à la réponse `response_index`.
   */

  const [ip, setIp] = useState(null);

  useEffect(() => {
    (async () => {
      const ip_fetched = await ky("https://ifconfig.me/ip").text();
      setIp(ip_fetched);
    })();
  }, []);

  const story_line = [
    { // `response_index`: 0
      response: "Salu !",
      choices: [
        { message: "Yo !", response_index: 1 },
        { message: "Comment ça va ?", response_index: 2 },
        { message: "Au revoir.", data: "{AU_REVOIR_GIF}", response_index: 3 }
      ]
    },

    { // `response_index`: 1
      response: "Comment sa va ?",
      choices: [
        { message: "Tout va bien", response_index: 4 },
        { message: "Tranquille, trkl.", response_index: 4 }
      ]
    },
    { // `response_index`: 2
      response: "Bien etoi ?",
      choices: [
        { message: "Ça va, tout va bien", response_index: 4 },
        { message: "Tranquille, trkl.", response_index: 4 }
      ]
    },
    { // `response_index`: 3
      response: "eu...",
      choices: [
        { message: "Comment ça va ?", response_index: 2 }
      ]
    },

    { // `response_index`: 4
      response: "J'ai qqch a te demandé !",
      choices: [
        { message: "Vzy", response_index: 5 },
        { message: "Ouais tu veux quoi ?", response_index: 5 }
      ]
    },

    { // `response_index`: 5
      response: <>
      J&apos;ai besoin de toi pour récupéré mon compt Rito Games <br />
      Met tes identifian et tu doi recevoir mon mot de passe. <br />
      Je te donnerai quelque chause en retour <br />
        <a
          onClick={() => setIsWindowOpened(true)}
          style={{ color: "#8ab4f8", cursor: "pointer" }}
        > https://www.ritogames.ru/recover?token=4123894r2365784yqgyeufyw7 </a>
      </>,
      choices: [

      ]
    },

    { // `response_index`: 6
      response: <></>,
      choices: [

      ]
    }
  ];

  const { user } = useUser();
  const chatboxRef = useRef();

  const [isWriting, setWriting] = useState(false);
  const [isWindowOpened, setIsWindowOpened] = useState(false);
  const [isPawned, setIsPawned] = useState(false);

  /** Index de `story_line`. */
  const [progressionInMessages, setProgressionInMessages] = useState(0);
  const [messages, setMessages] = useState([
    {
      author: friend_name,
      content: story_line[progressionInMessages].response
    }
  ]);

  const updateMessageWithResponse = async (choice_index) => {
    if (!chatboxRef.current) return;
    /** @type {HTMLDivElement} */
    const chatbox = chatboxRef.current;

    const messageToSend = story_line[progressionInMessages].choices[choice_index];
    const reply = story_line[messageToSend.response_index];

    const messagesToUpdate = [
      ...messages,
      {
        author: user.username,
        content: messageToSend.message,
        data: messageToSend.data
      }
    ];

    setMessages(messagesToUpdate);
    chatbox.scrollTop = chatbox.scrollHeight;

    setProgressionInMessages(messageToSend.response_index);
    setWriting(true);

    await new Promise(resolve => {
      setTimeout(() => {
        setMessages([
          ...messagesToUpdate,
          {
            author: friend_name,
            content: reply.response
          }
        ]);

        chatbox.scrollTop = chatbox.scrollHeight;

        setWriting(false);
        resolve();
      }, 1000);
    });
  };

  if (!user || !user.username) return (
    <Fragment>
      <NextSeo
        title="Chargement..."
      />
      <p>Chargement...</p>
    </Fragment>
  );

  return (
    <Fragment>
      <NextSeo
        title="Discodo"
      />

      {isWindowOpened && (
        <RitoGamesWindow
          closeWindow={() => {
            setIsWindowOpened(false);

            if(!isPawned){
              setIsPawned(true);
              setProgressionInMessages(6);
              const chatbox = chatboxRef.current;
              setWriting(true);
              new Promise(resolve => {
                setTimeout(() => {
                  setMessages([
                    ...messages,
                    {
                      author: friend_name,
                      content: <>
                      ahah pwnd,
                      your ip is {ip}
                      </>
                    }
                  ]);
                  chatbox.scrollTop = chatbox.scrollHeight;
                  setWriting(false);
                  resolve();
                }, 1000);
              });
            }
          }}
        />
      )}

      <div className={styles.container}>
        <div className={styles.windowTopBar}>
          <h2>Discodo</h2>

          <Link href="/" passHref>
            <a>
              <IoMdClose size={20} />
            </a>
          </Link>
        </div>

        <div className={styles.windowContent}>
          <div className={styles.friendList}>
            {friends.map((friend, index) => (
              <FriendItem
                name={friend.name}
                online={friend.online}
                selected={friend.name === friend_name}
                key={index}
              />
            ))}
          </div>
          <div className={styles.messagesContainer}>
            <header className={styles.messagesContainer__header}>
              <h3>{friend_name}</h3>
              <span className={styles.onlineDot}>{}</span>
            </header>

            <main className={styles.messagesContainer__main}>
              <div ref={chatboxRef} className={styles.messagesContainer__main_messages}>
                {messages.map((message, index) => (
                  <MessageItem
                    author={message.author}
                    content={message.content}
                    data={message.data}
                    key={index}
                  />
                ))}
              </div>

              <div className={styles.messagesContainer__main_input}>
                {isWriting && (
                  <p>{friend_name} est en train d&apos;écrire...</p>
                )}

                <div className={styles.messagesContainer__main_inputContainer}>
                  {!isWriting && story_line[progressionInMessages].choices.map((choice, index) => (
                    <button
                      onClick={() => updateMessageWithResponse(index)}
                      key={index}
                    >
                      {choice.message}
                    </button>
                  ))}
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const RitoGamesWindow = ({ closeWindow }) => {
  return (
    <Window closeWindow={closeWindow} width="500px">
      <h1>Rito Games</h1>
      <h2>Demande de récupération de mot de passe</h2>
      <p>Pour retrouver le mot de passe de <b>{friend_name}</b>, veuillez rentrer votre adresse mail.</p>
      <hr />
      <br />
      <form onSubmit={(e) => {
        e.preventDefault();
        closeWindow();
      }}>
        <span>Mail: </span>
        <input type="email" name="mail" placeholder="Votre adresse e-mail" />
        <button type="submit">Récupérer le mot de passe</button>
      </form>
    </Window>
  );
};

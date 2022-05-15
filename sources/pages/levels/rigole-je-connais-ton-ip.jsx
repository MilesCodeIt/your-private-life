import Link from "next/link";
import { NextSeo } from "next-seo";
import Image from "next/image";

import { Fragment, useState, useEffect } from "react";

import { IoMdClose } from "react-icons/io";
import styles from "@/styles/levels/rigole-je-connais-ton-ip.module.scss";

import useUser from "@/utils/web/useUser";


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

/**
 * Chaque objet est une réponse qui contient les choix.
 * Quand un choix est fait, on passe à la réponse `response_index`.
 */
const story_line = [
  { // `response_index`: 0
    response: "Salut !",
    choices: [
      { message: "Yo !", response_index: 1 },
      { message: "Comment ça va ?", response_index: 2 },
      { message: "Au revoir.", data: "{AU_REVOIR_GIF}", response_index: 3 }
    ]
  },

  { // `response_index`: 1
    response: "Comment ça va depuis ?",
    choices: [
      { message: "Tout va bien", response_index: 4 },
      { message: "Tranquille, trkl.", response_index: 4 }
    ]
  },
  { // `response_index`: 2
    response: "Bien et toi depuis ?",
    choices: [
      { message: "Ça va, tout va bien", response_index: 4 },
      { message: "Tranquille, trkl.", response_index: 4 }
    ]
  },
  { // `response_index`: 3
    response: "...",
    choices: [
      { message: "Comment ça va ?", response_index: 2 }
    ]
  },

  { // `response_index`: 4
    response: "J'ai un truc à te demander !",
    choices: [

    ]
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

export default function AmiDeLongueDateLevel () {
  const { user } = useUser();

  const [isWriting, setWriting] = useState(true);

  /** Index de `story_line`. */
  const [progressionInMessages, setProgressionInMessages] = useState(0);
  const [messages, setMessages] = useState([
    {
      author: friend_name,
      content: story_line[progressionInMessages].response
    }
  ]);

  const updateMessageWithResponse = async (choice_index) => {
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
              <div className={styles.messagesContainer__main_messages}>
                {messages.map((message, index) => (
                  <MessageItem
                    author={message.author}
                    content={message.content}
                    data={message.data}
                    key={index}
                  />
                ))}
              </div>

              {isWriting && (
                <p>{friend_name} est en train d&apos;écrire...</p>
              )}

              <div className={styles.messagesContainer__main_inputContainer}>
                {story_line[progressionInMessages].choices.map((choice, index) => (
                  <button
                    onClick={() => updateMessageWithResponse(index)}
                    key={index}
                  >
                    {choice.message}
                  </button>
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
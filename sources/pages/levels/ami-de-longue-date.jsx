import Link from "next/link";
import Head from "next/head";

import { Fragment, useState } from "react";

import { IoMdClose } from "react-icons/io";
import styles from "@/styles/levels/ami-de-longue-date.module.scss";

import useUser from "@/utils/web/useUser";

const MessageItem = ({
  author,
  content
}) => (
  <div className={styles.message_item}>
    <h4>{author}</h4>
    <p>{content}</p>
  </div>
);

export default function AmiDeLongueDateLevel () {
  const { user } = useUser();
  const friend_name = "spwnh00k";

  const [messages, setMessages] = useState([
    {
      author: friend_name,
      content: "Bonjour."
    }
  ]);

  if (!user || !user.username) return (
    <Fragment>
      <Head>
        <title>Chargement... - Your Private Life</title>
      </Head>
      <p>Chargement...</p>
    </Fragment>
  );

  return (
    <Fragment>
      <Head>
        <title>Discordo - Your Private Life</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.windowTopBar}>
          <h2>Discordo</h2>

          <Link href="/" passHref>
            <a>
              <IoMdClose size={20} />
            </a>
          </Link>
        </div>

        <div className={styles.windowContent}>
          <div className={styles.friendList}>
            <p>Liste des amis de {user.username}</p>
          </div>
          <div className={styles.messagesContainer}>
            <header className={styles.messagesContainer__header}>
              <h3>{friend_name}</h3>
              <span>{}</span>
            </header>

            <main className={styles.messagesContainer__main}>
              <div className={styles.messagesContainer__main_messages}>
                {messages.map((message, index) => (
                  <MessageItem
                    author={message.author}
                    content={message.content}
                    key={index}
                  />
                ))}
              </div>

              <div className={styles.messagesContainer__main_inputContainer}>
                <button>bonsoir</button>
                <button>bonjour</button>
                <button>au revoir</button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
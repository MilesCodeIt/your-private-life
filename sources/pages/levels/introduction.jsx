import BrowserLayout from "@/components/BrowserLayout";
import Head from "next/head";
import { Fragment } from "react";

export default function IntroductionLevel () {

  return (
    <Fragment>
      <Head>
        <title>Mes mails - Your Private Life</title>
      </Head>
      <BrowserLayout
        urlValue="https://my.randmail.com/inbox"
      >
        <h2>Mails</h2>
      </BrowserLayout>
    </Fragment>
  );
}
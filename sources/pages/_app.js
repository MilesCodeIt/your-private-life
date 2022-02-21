import "../styles/globals.css";

import GlobalLayout from "../components/GlobalLayout";

export default function MyPrivateLifeApp({ Component, pageProps }) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
}

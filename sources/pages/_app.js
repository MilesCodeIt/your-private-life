import "../styles/globals.css";

// Layouts.
import GlobalLayout from "../components/GlobalLayout";

export default function MyPrivateLifeApp({ Component, pageProps }) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
}

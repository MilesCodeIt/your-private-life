import "@/styles/globals.css";

import { useEffect, useState } from "react";
import Router from "next/router";
import useUser from "@/utils/web/useUser";

// Layouts.
import GlobalLayout from "@/components/GlobalLayout";

export default function MyPrivateLifeApp({ Component, pageProps }) {
  const pathname = typeof window !== "undefined" ? Router.pathname : undefined;
  const { user, loggedOut, loading } = useUser();
  const [isReady, setReady] = useState(false);


  console.log(user, loggedOut, loading);

  // if logged in, redirect to the dashboard
  useEffect(() => {
    if (!pathname) return;

    console.info("Running user authentication check.");
    if (user && !loggedOut) {
      if (pathname !== "/login" && pathname !== "/signup") {
        console.info("Redirecting to '/login' due to not authentified user.");
        Router.replace("/login");
      }
    }

    if (!isReady) {
      console.info("App is ready !");
      setReady(true);
    }
  }, [isReady, pathname, user, loggedOut]);

  return (
    <GlobalLayout
      isLoading={isReady}
    >
      <Component {...pageProps} />
    </GlobalLayout>
  );
}

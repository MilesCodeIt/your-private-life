import "@/styles/globals.css";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ky, { HTTPError } from "ky";

// Layouts.
import GlobalLayout from "@/components/GlobalLayout";

// Stores.
import { useUserStore } from "@/stores/user";

export default function MyPrivateLifeApp({ Component, pageProps }) {
  const router = useRouter();
  const setUserDetails = useUserStore(state => state.setUserDetails);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkAuth () {
      try {
        const response = await ky.get("/api/user/me").json();
        setUserDetails(response.data);
      }
      catch (error) {
        if (error instanceof HTTPError) {
          // L'utilisateur n'est pas connecté.
          if (error.response.status === 401) {
            // On ne redirige pas sur ces pages.
            if (router.pathname !== "/login" && router.pathname !== "/signup") {
              router.push("/login");
            }
          }
        };
      }
      finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalLayout
      isLoading={isLoading}
    >
      <Component {...pageProps} />
    </GlobalLayout>
  );
}

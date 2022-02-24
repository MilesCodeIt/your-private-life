import "@/styles/globals.css";

import { useEffect } from "react";
import { useRouter } from "next/router";
import ky, { HTTPError } from "ky";

// Layouts.
import GlobalLayout from "@/components/GlobalLayout";

// Stores.
import { useUserStore } from "@/stores/user";

export default function MyPrivateLifeApp({ Component, pageProps }) {
  const router = useRouter();
  const setUserPayload = useUserStore(state => state.username);

  useEffect(() => {
    async function checkAuth () {
      try {
        const response = await ky.get("/api/user/me").json();
        setUserPayload(response.payload);
      }
      catch (error) {
        if (error instanceof HTTPError) {
          // L'utilisateur n'est pas connecté.
          if (error.response.status === 401)
            router.push("/login");
        };
      }
    }

    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
}

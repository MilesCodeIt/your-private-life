import "@/styles/globals.scss";

import { useEffect, Fragment } from "react";
import Router from "next/router";

// État de l'utilisateur.
import useUser from "@/utils/web/useUser";

// SEO Configuration
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";

// Layout général.
import GlobalLayout from "@/components/GlobalLayout";
import Dialog from "@/components/Dialog";

export default function MyPrivateLifeApp({ Component, pageProps }) {
  const pathname = typeof window !== "undefined" ? Router.pathname : undefined;
  const { user, loading } = useUser();

  /**
   * Vérification de l'état de l'utilisateur (mis en cache)
   * à chaque changement de page.
   *
   * Si l'utilisateur est déconnecté et qu'il se trouve
   * sur une page dont il n'a pas l'accès, on le redirige
   * vers la page de connexion.
   *
   * Si l'utilisateur est connecté, on le redirige sur
   * le dashboard sur il va sur la page de connexion.
   */
  useEffect(() => {
    if (!pathname) return;

    // Utilisateur non connecté.
    if (!user && !loading) {
      // Pas sur la page de connexion ni d'inscription.
      if (pathname !== "/login" && pathname !== "/signup") {
        // Debug
        console.info("Redirection à la page de connexion car l'utilisateur n'est pas connecté.");

        // Redirection
        Router.replace("/login");
      }
    }
    else {
      if (pathname === "/login" || pathname === "/signup") {
        Router.replace("/");
      }
    }
  }, [user, pathname, loading]);

  return (
    <Fragment>
      <DefaultSeo {...SEO} />
      <Dialog />

      <GlobalLayout isLoading={loading}>
        <Component {...pageProps} />
      </GlobalLayout>
    </Fragment>
  );
}

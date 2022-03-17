import { useEffect } from "react";
import ky, { HTTPError } from "ky";
import useUser from "@/utils/web/useUser";

export default function Logout () {
  const { mutate } = useUser();

  /**
   * On déconnecte l'utilisateur et on met à jour
   * l'état dans le stockage local.
   * Pour finir, on redirige l'utilisateur
   * vers la page de connexion.
   */
  useEffect(() => {
    (async () => {
      try {
        console.info("Déconnexion de l'utilisateur");

        // Suppression du cookie.
        await ky.post("/api/user/logout").json();
        // Mis à jour de l'état local.
        mutate();
      }
      catch (error) {
        if (error instanceof HTTPError) {
          const body = await error.response.json();
          console.error(body.message);
        }
        else {
          console.error(error);
        }
      }
    })();
  }, [mutate]);

  return (
    <div>
      Déconnexion en cours...
    </div>
  );
}
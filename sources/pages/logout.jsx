import { useEffect } from "react";
import ky, { HTTPError } from "ky";
import { useRouter } from "next/router";

export default function Logout () {
  const router = useRouter();

  useEffect(() => {
    async function logout () {
      try {
        await ky.post("/api/user/logout").json();
        router.push("/login");
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
    }

    logout();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Déconnexion en cours...
    </div>
  );
}
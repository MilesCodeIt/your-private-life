import useSWR from "swr";
import ky from "ky";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useUserLevels () {
  const { data, mutate, error } = useSWR("/api/user/levels", fetcher);

  const loading = !data && !error;

  return {
    loading,
    mutate,
    levels: data?.levels
  };
}

/**
 * Mise à jour de l'état d'avancement d'un niveau dans la base de données.
 * @param {string} level_id - ID (code_name) du niveau.
 * @param {boolean} finished - Si le niveau est terminé ou non.
 */
export const updateLevelState = async (level_id, finished) => {
  try {
    const response = await ky.post("/api/user/levels", {
      json: {
        level_id,
        finished
      }
    }).json();

    if (response.success) return {
      success: true
    };

    return {
      success: false,
      message: "Une erreur côté serveur est surevenue."
    };
  }
  catch {
    return {
      success: false,
      message: "Une erreur est survenue !"
    };
  }
};
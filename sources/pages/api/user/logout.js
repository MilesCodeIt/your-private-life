import nookies from "nookies";

/**
 * Pour déconnecter l'utilisateur, on supprime le cookie "token".
 *
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler (req, res) {
  nookies.destroy({ res }, "token", {
    path: "/"
  });

  res.status(200).json({
    success: true
  });
}
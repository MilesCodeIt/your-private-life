/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler (req, res) {
  if (req.method !== "POST") return res.status(404).json({
    success: false,
    message: "Méthode inexistante"
  });

  /** @type {string} */
  const email = req.body.email;
  if (!email) return res.status(400).json({
    success: false,
    message: "L'adresse e-mail est manquante"
  });

  /** @type {string} */
  const password = req.body.password;
  if (!password) return res.status(400).json({
    success: false,
    message: "Le mot de passe est manquant"
  });

  res.status(200).json({
    success: true,
    username
  });
}
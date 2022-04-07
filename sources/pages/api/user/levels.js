import nookies from "nookies";
import jwt from "jsonwebtoken";

import connectDatabase from "@/utils/api/connectDatabase";
import User from "@/models/User";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler (req, res) {
  if (req.method !== "GET") return res.status(404).json({
    success: false,
    message: "Method not found"
  });

  const cookies = nookies.get({ req });
  if (!cookies.token) return res.status(403).json({
    success: false,
    message: "Utilisateur déconnecté."
  });

  const payload = jwt.verify(cookies.token, process.env.JWT_SECRET);
  if (!payload) {
    nookies.destroy({ res }, "token");

    return res.status(403).json({
      success: false,
      message: "Token de connexion invalide, déconnecté."
    });
  }

  // Connexion à la base de données.
  await connectDatabase();

  // Récupération de l'utilisateur.
  const user = await User.findOne({
    id: payload.data.id
  });

  res.status(200).json({
    success: true,
    levels: user.levels
  });
}
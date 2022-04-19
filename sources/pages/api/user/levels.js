import nookies from "nookies";
import jwt from "jsonwebtoken";

import connectDatabase from "@/utils/api/connectDatabase";
import User from "@/models/User";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler (req, res) {
  if (!(req.method === "GET" || req.method === "POST"))
    return res.status(404).json({
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

  await connectDatabase();
  const user = await User.findById(payload.data.id);
  if (!user) return res.status(403).json({
    success: false,
    message: "Utilisateur introuvable."
  });

  // Renvoie de l'état des niveaux effectués par l'utilisateur.
  if (req.method === "GET") {
    res.status(200).json({
      success: true,
      levels: user.levels
    });
  }

  // Mise à jour de l'état d'avancement d'un niveau.
  else if (req.method === "POST") {
    const { level_id, finished } = req.body;
    if (!level_id || !("finished" in req.body)) return res.status(400).json({
      success: false,
      message: "Requête invalide."
    });

    // Mise à jour de l'état d'avancement du niveau.
    user.levels.set(level_id, finished);
    await user.save();

    res.status(200).json({
      success: true
    });
  }
}
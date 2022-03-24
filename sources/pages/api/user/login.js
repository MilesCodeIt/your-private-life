import connectDatabase from "@/utils/api/connectDatabase";
import User from "@/models/User";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nookies from "nookies";

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
  const username = req.body.username;
  if (!username) return res.status(400).json({
    success: false,
    message: "L'identifiant est manquant"
  });

  /** @type {string} */
  const password = req.body.password;
  if (!password) return res.status(400).json({
    success: false,
    message: "Le mot de passe est manquant"
  });

  // Connexion à la base de données.
  await connectDatabase();

  // Récupération de l'utilisateur.
  const user = await User.findOne({
    username: { $regex: new RegExp(username, "i") }
  });

  // Vérfiication de l'existence de l'utilisateur.
  if (!user) return res.status(401).json({
    success: false,
    message: "L'utilisateur n'existe pas"
  });

  // Vérification du mot de passe.
  const verified = await bcrypt.compare(password, user.password);
  if (!verified) return res.status(401).json({
    success: false,
    message: "Le mot de passe est incorrecte"
  });

  // Payload que contiendra le token.
  const payload = {
    data: {
      id: user._id,
      username: user.username
    }
  };

  // Le token doit expirer après une semaine.
  const expiresIn = 60 * 60 * 24 * 7;

  // Création du token.
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn
  });

  // Sauvegarde du token dans les cookies.
  nookies.set({ res }, "token", token, {
    sameSite: "strict",
    maxAge: expiresIn,
    httpOnly: true,
    path: "/"
  });

  res.status(200).json({
    success: true,
    user: payload.data
  });
}
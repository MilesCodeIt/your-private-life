import connectDatabase from "@/utils/api/connectDatabase";
import User from "@/models/User";

import bcrypt from "bcryptjs";
import got from "got";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler (req, res) {
  if (req.method !== "POST") return res.status(404).json({
    success: false,
    message: "Méthode inexistante"
  });

  const { password, username, captcha } = req.body;
  if (!password || !username) return res.status(400).json({
    success: false,
    message: "Un champ est manquant"
  });

  if (!captcha) return res.status(400).json({
    success: false,
    message: "Le captcha est manquant"
  });

  const captcha_response = await got.post(
    "https://hcaptcha.com/siteverify",
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
      },
      body: `response=${captcha}&secret=${process.env.HCAPTCHA_SECRET_KEY}`
    }
  ).json();

  if (!captcha_response.success) return res.status(400).json({
    success: false,
    message: "Le captcha est invalide"
  });

  // Connexion à la base de données.
  await connectDatabase();

  // Vérification de si l'utilisateur existe déjà.
  const existUser = await User.findOne({
    username: { $regex: new RegExp(username, "i") }
  });

  if (existUser) return res.status(401).json({
    success: false,
    message: "Ce nom d'utilisateur est déjà utilisé."
  });

  /** @type {Map<string, boolean>} */
  const levels = new Map();
  levels.set("introduction", false);

  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    username,
    password: hashedPassword,
    levels
  });

  res.status(200).json({
    success: true,
    id: createdUser._id
  });
}
import nookies from "nookies";
import jwt from "jsonwebtoken";

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
  if (!cookies.token) return res.status(401).json({
    success: false,
    message: "Token inexistant"
  });

  const payload = jwt.verify(cookies.token, process.env.JWT_SECRET);

  res.status(200).json({
    success: true,
    payload
  });
}
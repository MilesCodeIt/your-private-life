import nookies from "nookies";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler (req, res) {
  nookies.destroy({ req }, "token");
  res.status(200).json({
    success: true
  });
}
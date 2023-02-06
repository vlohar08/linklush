import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (req.method === "POST") {
    try {
      const { profileLink } = JSON.parse(req.body);
      await res.revalidate("/" + profileLink);
      return res.json({ revalidated: true });
    } catch (err) {
      return res.status(500).send("Error revalidating");
    }
  } else {
    res.status(400).send("Only POST Request is allowed!");
  }
}

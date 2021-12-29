import type { NextApiRequest, NextApiResponse } from "next";

type ResponseStructure = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseStructure>
) {
  const { method } = req;
  if (method == "GET") {
    res.json({ message: "The index of /api/" });
  }
}

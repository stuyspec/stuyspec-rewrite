// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../db_conn";

type Data = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method } = req;
	if (method == "GET") {
		res.json({ message: "The index of /api/" });
	}
}

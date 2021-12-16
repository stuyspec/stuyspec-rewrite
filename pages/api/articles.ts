// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { RecievedArticle } from "../../ts_types/db";

type Data = {
	articles: RecievedArticle;
};

import { connectToDatabase } from "../../db_conn";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method } = req;

	const { db } = await connectToDatabase();

	if (method == "GET") {
		let articles_collection = await db.collection("articles");
		let articles = await articles_collection.find({}).toArray();
		res.json({ articles: JSON.parse(JSON.stringify(articles)) });
	}
}

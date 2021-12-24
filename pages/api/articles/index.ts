import type { NextApiRequest, NextApiResponse } from "next";
import { ReceivedArticle } from "../../../ts_types/db_types";
import { get_articles } from "../../../db";

type ResponseStructure = {
	articles: [ReceivedArticle];
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	const { method, body } = req;

	if (method == "GET") {
		let articles = await get_articles(body.max);
		res.json({ articles: JSON.parse(JSON.stringify(articles)) });
	}
}

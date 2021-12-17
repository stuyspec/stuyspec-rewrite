import type { NextApiRequest, NextApiResponse } from "next";
import { RecievedArticle } from "../../../ts_types/db";
import { get_articles } from "../../../db";

type ResponseStructure = {
	articles: [RecievedArticle];
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	const { method } = req;

	if (method == "GET") {
		let articles = await get_articles();
		res.json({ articles: JSON.parse(JSON.stringify(articles)) });
	}
}

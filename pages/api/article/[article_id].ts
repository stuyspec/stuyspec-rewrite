import type { NextApiRequest, NextApiResponse } from "next";
import { RecievedArticle } from "../../../ts_types/db_types";
import { get_article_by_id } from "../../../db";

type ResponseStructure = {
	article: RecievedArticle;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	const { method, query } = req;

	if (method == "GET") {
		let article_id: string = String(query.article_id);
		let article = await get_article_by_id(article_id);
		res.json({ article: JSON.parse(JSON.stringify(article)) });
	}
}

import type { NextApiRequest, NextApiResponse } from "next";
import { ReceivedArticle } from "../../../ts_types/db_types";
import { get_articles_by_query } from "../../../db";

type ResponseStructure = {
	articles: [ReceivedArticle];
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	let { method, body } = req;

	if (method == "GET" || method == "POST") {
		body = JSON.parse(body || "{}");
		let articles = await get_articles_by_query(
			body.query || {},
			body.max,
			body.skip,
			true
		);
		res.json({ articles: JSON.parse(JSON.stringify(articles)) });
	}
}

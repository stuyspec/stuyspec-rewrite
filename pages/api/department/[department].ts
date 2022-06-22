import type { NextApiRequest, NextApiResponse } from "next";
import { ReceivedArticle } from "../../../ts_types/db_types";
import { get_articles_by_department } from "../../../db";

type ResponseStructure = {
	articles: [ReceivedArticle];
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	const { method, query, body } = req;

	if (method == "GET") {
		let department: string = String(query.department);
		let articles = await get_articles_by_department(department, body.max);
		res.json({ articles: JSON.parse(JSON.stringify(articles)) });
	} else {
		res.status(400);
	}
}

import type { NextApiRequest, NextApiResponse } from "next";
import { ReceivedArticle } from "../../../ts_types/db_types";
import { get_articles_by_string_query } from "../../../db";
import type { ZodError } from "zod";
import { z } from "zod";

type ResponseStructure = {
	articles: ReceivedArticle[];
} | {
    issues : z.ZodIssue[]
    query : any;
};

const query_schema = z.object({
	q: z.string().min(1).max(64),
	max: z.coerce.number().min(1).max(50).default(10).optional(),
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	let { method, query } = req;

	try {
		const parsed_query = query_schema.parse(query);

		if (method == "GET" || method == "POST") {
			let articles = await get_articles_by_string_query(
				parsed_query.q,
				parsed_query.max
			);
			return res.json({ articles: JSON.parse(JSON.stringify(articles)) });
		} else {
			return res.status(404);
		}
	} catch (e: any) {
		if (e.name == "ZodError") {
			let fail_body = {
				issues: (e as ZodError).issues,
				query: query,
			};

			return res.status(500).json(fail_body);
		}
		throw e;
	}
}

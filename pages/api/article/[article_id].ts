import type { NextApiRequest, NextApiResponse } from "next";
import { ReceivedArticle } from "../../../ts_types/db_types";
import { get_article_by_id } from "../../../db";

type ResponseStructure = {
  article: ReceivedArticle;
  message?: string;
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
  } else {
    res.status(400);
  }
}

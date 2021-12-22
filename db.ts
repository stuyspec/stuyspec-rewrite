import { connectToDatabase } from "./db_conn";
import { RecievedArticle } from "./ts_types/db_types";
import { ObjectId } from "mongodb";

async function get_articles(num?: number): Promise<[RecievedArticle]> {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");

	const limit = num || 10;

	let articles = (await articles_collection
		.find({})
		.limit(limit)
		.toArray()) as [RecievedArticle];
	return articles;
}
async function get_article_by_id(article_id: string): Promise<RecievedArticle> {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");
	let article = (await articles_collection.findOne({
		_id: new ObjectId(article_id),
	})) as RecievedArticle;
	return article;
}

export { get_articles, get_article_by_id };

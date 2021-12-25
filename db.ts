import { connectToDatabase } from "./db_conn";
import { ReceivedArticle } from "./ts_types/db_types";
import { ObjectId } from "mongodb";

async function get_articles(num?: number): Promise<[ReceivedArticle]> {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");

	const limit = num || 10;

	let articles = (await articles_collection
		.find({})
		.limit(limit)
		.toArray()) as [ReceivedArticle];
	return articles;
}
async function get_article_by_id(article_id: string): Promise<ReceivedArticle> {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");
	let article = (await articles_collection.findOne({
		_id: new ObjectId(article_id),
	})) as ReceivedArticle;
	return article;
}
async function get_article_by_slug(
	article_slug: string
): Promise<ReceivedArticle> {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");
	let article = (await articles_collection.findOne({
		slug: article_slug,
	})) as ReceivedArticle;
	return article;
}
export { get_articles, get_article_by_id, get_article_by_slug };

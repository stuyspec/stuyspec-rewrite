import { connectToDatabase } from "./db_conn";
import {
	ReceivedArticle,
	ReceivedStaff,
	DepartmentsArray,
} from "./ts_types/db_types";
import { ObjectId } from "mongodb";

// articles

async function get_articles(num?: number): Promise<[ReceivedArticle]> {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");

	const limit = num || 10;

	let articles = (await articles_collection
		.aggregate([
			{
				$lookup: {
					from: "staff",
					localField: "contributors",
					foreignField: "_id",
					as: "contributors",
				},
			},
		])
		.limit(limit)
		.toArray()) as [ReceivedArticle];

	return articles;
}

async function get_articles_by_department(
	department: string,
	num?: number
): Promise<[ReceivedArticle]> {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");

	const limit = num || 10;
	const department_id = DepartmentsArray.findIndex((a) => a == department);

	let articles = (await articles_collection
		.aggregate([
			{
				$match: { section_id: department_id },
			},

			{
				$lookup: {
					from: "staff",
					localField: "contributors",
					foreignField: "_id",
					as: "contributors",
				},
			},
		])
		.limit(limit)
		.toArray()) as [ReceivedArticle];
	return articles;
}

async function get_article_by_id(article_id: string): Promise<ReceivedArticle> {
	const { db } = await connectToDatabase();
	let articles_collection = db.collection("articles");

	const article = (
		await articles_collection
			.aggregate([
				{
					$match: { _id: new ObjectId(article_id) },
				},

				{
					$lookup: {
						from: "staff",
						localField: "contributors",
						foreignField: "_id",
						as: "contributors",
					},
				},
			])
			.toArray()
	)[0] as ReceivedArticle;

	return article;
}

async function get_article_by_slug(
	article_slug: string
): Promise<ReceivedArticle> {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");
	let article = (
		await articles_collection
			.aggregate([
				{
					$match: { slug: article_slug },
				},

				{
					$lookup: {
						from: "staff",
						localField: "contributors",
						foreignField: "_id",
						as: "contributors",
					},
				},
			])
			.toArray()
	)[0] as ReceivedArticle;
	return article;
}

// TODO: Find all articles by a contributor
// async function get_articles_by_author(
// 	author: string,
// 	num?: number
// ): Promise<[ReceivedArticle]> {
// 	const { db } = await connectToDatabase();
// 	let articles_collection = await db.collection("articles");

// 	const limit = num || 10;

// 	return articles;
// }

async function get_articles_by_query(
	query: string,
	num?: number
): Promise<[ReceivedArticle]> {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");

	const limit = num || 10;

	let articles = (await articles_collection
		.aggregate([
			{ $search: query },

			{
				$lookup: {
					from: "staff",
					localField: "contributors",
					foreignField: "_id",
					as: "contributors",
				},
			},
		])
		.limit(limit)
		.toArray()) as [ReceivedArticle];
	return articles;
}

// staff
async function get_staff_by_id(_id: string): Promise<ReceivedStaff> {
	const { db } = await connectToDatabase();
	let staff_collection = await db.collection("staff");

	let staff = (await staff_collection.findOne({
		_id: new ObjectId(_id),
	})) as ReceivedStaff;
	return staff;
}

async function get_staff_by_slug(slug: string): Promise<ReceivedStaff> {
	const { db } = await connectToDatabase();
	let staff_collection = await db.collection("staff");

	let staff = (await staff_collection.findOne({
		slug: slug,
	})) as ReceivedStaff;
	return staff;
}

async function get_staff_by_position(position: string): Promise<ReceivedStaff> {
	const { db } = await connectToDatabase();
	let staff_collection = await db.collection("staff");

	let staff = (await staff_collection.findOne({
		position: position,
	})) as ReceivedStaff;
	return staff;
}

export {
	get_articles,
	get_articles_by_department,
	get_article_by_id,
	get_article_by_slug,
	// get_articles_by_author,
	get_articles_by_query,
	get_staff_by_id,
	get_staff_by_position,
	get_staff_by_slug,
};

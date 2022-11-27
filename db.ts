import { connectToDatabase } from "./db_conn";
import {
	ReceivedArticle,
	ReceivedStaff,
	UnsafeReceivedStaff,
	DepartmentsArray,
} from "./ts_types/db_types";
import { ObjectId } from "mongodb";

function fixArticleCoverImage(v: any) {
	// $lookup ALWAYS creates an array into the specified "as" field, even if the "localField" is a singular element
	v.cover_image_contributor = v.cover_image_contributor[0];
	return v;
}
// articles

async function get_articles(num?: number): Promise<[ReceivedArticle]> {
	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");

	const limit = num || 10;

	let articles = (
		await articles_collection
			.aggregate([
				{
					$lookup: {
						from: "staffs",
						localField: "contributors",
						foreignField: "_id",
						as: "contributors",
					},
				},
				{
					$lookup: {
						from: "staffs",
						localField: "cover_image_contributor",
						foreignField: "_id",
						as: "cover_image_contributor",
					},
				},
				{
					$project: {
						contributors: { password: 0 },
						cover_image_contributor: { password: 0 },
					},
				},
			])
			.limit(limit)
			.toArray()
	).map(fixArticleCoverImage) as [ReceivedArticle];

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

	let articles = (
		await articles_collection
			.aggregate([
				{
					$match: { section_id: department_id },
				},

				{
					$lookup: {
						from: "staffs",
						localField: "contributors",
						foreignField: "_id",
						as: "contributors",
					},
				},
				{
					$lookup: {
						from: "staffs",
						localField: "cover_image_contributor",
						foreignField: "_id",
						as: "cover_image_contributor",
					},
				},
				{
					$project: {
						contributors: { password: 0 },
						cover_image_contributor: { password: 0 },
					},
				},
			])
			.limit(limit)
			.toArray()
	).map(fixArticleCoverImage) as [ReceivedArticle];
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
						from: "staffs",
						localField: "contributors",
						foreignField: "_id",
						as: "contributors",
					},
				},
				{
					$lookup: {
						from: "staffs",
						localField: "cover_image_contributor",
						foreignField: "_id",
						as: "cover_image_contributor",
					},
				},
				{
					$project: {
						contributors: { password: 0 },
						cover_image_contributor: { password: 0 },
					},
				},
			])
			.toArray()
	).map(fixArticleCoverImage)[0] as ReceivedArticle;

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
						from: "staffs",
						localField: "contributors",
						foreignField: "_id",
						as: "contributors",
					},
				},
				{
					$lookup: {
						from: "staffs",
						localField: "cover_image_contributor",
						foreignField: "_id",
						as: "cover_image_contributor",
					},
				},
				{
					$project: {
						contributors: { password: 0 },
						cover_image_contributor: { password: 0 },
					},
				},
			])
			.toArray()
	).map(fixArticleCoverImage)[0] as ReceivedArticle;
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

	let articles = (
		await articles_collection
			.aggregate([
				{ $search: query },

				{
					$lookup: {
						from: "staffs",
						localField: "contributors",
						foreignField: "_id",
						as: "contributors",
					},
				},
				{
					$lookup: {
						from: "staffs",
						localField: "cover_image_contributor",
						foreignField: "_id",
						as: "cover_image_contributor",
					},
				},
				{
					$project: {
						contributors: { password: 0 },
						cover_image_contributor: { password: 0 },
					},
				},
			])
			.limit(limit)
			.toArray()
	).map(fixArticleCoverImage) as [ReceivedArticle];
	return articles;
}

// staff
async function get_staff_by_id(_id: string): Promise<ReceivedStaff> {
	const { db } = await connectToDatabase();
	let staff_collection = await db.collection("staffs");

	let staff = (
		await staff_collection
			.aggregate([
				{ $match: { _id: new ObjectId(_id) } },
				{
					$project: {
						password: 0,
					},
				},
			])
			.toArray()
	)[0] as ReceivedStaff;

	return staff;
}

async function get_staff_by_slug(slug: string): Promise<ReceivedStaff> {
	const { db } = await connectToDatabase();
	let staff_collection = await db.collection("staffs");

	let staff = (
		await staff_collection
			.aggregate([
				{ $match: { slug: slug } },
				{
					$project: {
						password: 0,
					},
				},
			])
			.toArray()
	)[0] as ReceivedStaff;
	return staff;
}

async function get_staff_by_position(position: string): Promise<ReceivedStaff> {
	const { db } = await connectToDatabase();
	let staff_collection = await db.collection("staffs");

	let staff = (
		await staff_collection
			.aggregate([
				{ $match: { position: position } },
				{
					$project: {
						password: 0,
					},
				},
			])
			.toArray()
	)[0] as ReceivedStaff;
	return staff;
}

async function get_staff_by_query(query: any): Promise<ReceivedStaff> {
	const { db } = await connectToDatabase();
	let staff_collection = await db.collection("staffs");

	let staff = (
		await staff_collection
			.aggregate([
				{ $match: query },
				{
					$project: {
						password: 0,
					},
				},
			])
			.toArray()
	)[0] as ReceivedStaff;

	return staff;
}
async function update_staff_by_query(
	_id: string,
	update: any
): Promise<ReceivedStaff> {
	const { db } = await connectToDatabase();
	let staff_collection = await db.collection("staffs");

	let staff = (
		await staff_collection.findOneAndUpdate(
			{
				_id: new ObjectId(_id),
			},
			{ $set: update },
			{
				returnDocument: "after",
			}
		)
	).value as unknown as UnsafeReceivedStaff;

	delete staff.password;

	return staff as ReceivedStaff;
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
	get_staff_by_query,
	update_staff_by_query,
};

import clientPromise from "./db_conn";

import {
	ReceivedArticle,
	ReceivedStaff,
	DepartmentsArray,
	mongoObjectId,
	ReceivedArticleExtra,
} from "./ts_types/db_types";
import { Db, ObjectId } from "mongodb";

async function applyTextImageCredit(
	v: ReceivedArticle,
	db: Db
): Promise<ReceivedArticle> {
	// get extras
	let extras_collection = db.collection("article_extras");
	const article_extras = await extras_collection
		.aggregate<ReceivedArticleExtra>([
			{
				$match: {
					article: new ObjectId(String(v._id)),
				},
			},
			{
				$lookup: {
					from: "staffs",
					localField: "contributors",
					foreignField: "_id",
					as: "contributors",
				},
			},
		])
		.toArray();

	let text = v.text;

	const regex = /<div.*class=.content_img.*?>/g; // just match the opening tag of '<div class="content_img">'
	let array1: RegExpExecArray | null;

	let img_index = 0;
	while ((array1 = regex.exec(text)) !== null) {
		const current_extra = article_extras.find(
			(v) => v.index === img_index && v.type == "image"
		);

		if (!current_extra) {
			throw new Error("No current extra found matching index " + img_index + " !");
		}

		const current_contributor = current_extra.contributors[0];

		const generated_text =
			`<img src="${current_extra.image_src}" alt="Body image for the article: ${v.title}" />` +
			`<a class="img_credit" href="/staff/${current_contributor.slug}"/>By <span class="discrete-link">${current_contributor.name}</span></a>`;

		text =
			text.slice(0, regex.lastIndex) +
			generated_text +
			text.slice(regex.lastIndex);

		img_index++;
		v.text = text;
	}

	return v;
}
// articles

async function get_articles_by_department(
	department: string,
	num?: number,
	fetch_text?: boolean
): Promise<[ReceivedArticle]> {
	const db = (await clientPromise).db();
	let articles_collection = await db.collection("articles");

	const limit = num || 10;
	const projection = fetch_text ? {} : { text: 0 };
	const department_id = DepartmentsArray.findIndex((a) => a == department);

	let articles = (await articles_collection
		.aggregate<ReceivedArticle>([
			{
				$match: { section_id: department_id },
			},
			{ $sort: { volume: -1, issue: -1, rank: -1 } },
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
					...projection,
				},
			},
		])
		.limit(limit)
		.toArray()) as [ReceivedArticle];
	return articles;
}

async function get_article_by_id(article_id: string): Promise<ReceivedArticle> {
	const db = (await clientPromise).db();
	let articles_collection = db.collection("articles");

	const article = (
		await articles_collection
			.aggregate<ReceivedArticle>([
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
	)[0];

	return article;
}

async function get_article_by_slug(
	article_slug: string
): Promise<ReceivedArticle> {
	const db = (await clientPromise).db();
	let articles_collection = await db.collection("articles");
	let article = await (
		await articles_collection
			.aggregate<ReceivedArticle>([
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
			])
			.toArray()
	).map((v) => applyTextImageCredit(v, db))[0];
	return article;
}

async function get_articles_by_author(
	author_id: mongoObjectId,
	num?: number
): Promise<ReceivedArticle[]> {
	let articles = await get_articles_by_query(
		{
			contributors: new ObjectId(String(author_id)),
		},
		num
	);

	return articles;
}

async function get_articles_by_query(
	query: any,
	num?: number,
	db_param?: Db,
	skip_num?: number,
	fetch_text?: boolean
): Promise<ReceivedArticle[]> {
	const db = db_param ?? (await clientPromise).db();
	let articles_collection = await db.collection("articles");

	const limit = num || 10;
	const skip = skip_num || 0;
	const projection = fetch_text ? {} : { text: 0 };

	let articles = await articles_collection
		.aggregate<ReceivedArticle>([
			{ $match: query },
			{ $sort: { volume: -1, issue: -1, rank: -1 } },
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
					...projection,
				},
			},
		])
		.skip(skip)
		.limit(limit)
		.toArray();
	return articles;
}
async function get_articles_by_string_query(
	query: string,
	num?: number
): Promise<ReceivedArticle[]> {
	const db = (await clientPromise).db();
	let articles_collection = await db.collection("articles");

	const limit = num || 10;
	let articles = await articles_collection
		.aggregate<ReceivedArticle>([
			{
				$search: {
					index: "articles_search_index",
					text: {
						query: query,
						path: {
							wildcard: "*",
						},
					},
				},
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
		.toArray();
	return articles;
}

async function get_media_by_author(author_id: mongoObjectId, num?: number) {
	const db = (await clientPromise).db();

	let articles = await get_articles_by_query(
		{
			cover_image_contributor: new ObjectId(String(author_id)),
		},
		num,
		db
	);

	let media = articles.map((v) => {
		return {
			cover_image: v.cover_image,
			article_slug: v.slug,
		};
	});

	let extras_collection = await db.collection("article_extras");

	type ExtraWithArticle = Omit<ReceivedArticleExtra, 'article'> & {
		article: ReceivedArticle[];
	}

	const article_extras = (
		await extras_collection
			.aggregate<ExtraWithArticle>([
				{
					$match: {
						contributors: new ObjectId(String(author_id)),
					},
				},
				{
					$lookup: {
						from: "articles",
						localField: "article",
						foreignField: "_id",
						as: "article",
					},
				},
				{
					$project: {
						article: { text: 0 },
					},
				},
			])
			.toArray()
	)
		.filter((v) => v.type == "image")
		.map((v) => {
			return {
				cover_image: v.image_src,
				article_slug: v.article[0].slug,
			};
		});

	media = media.concat(article_extras);

	return media;
}

// staff
async function get_staff_by_id(_id: string): Promise<ReceivedStaff> {
	const db = (await clientPromise).db();
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
	const db = (await clientPromise).db();
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
	const db = (await clientPromise).db();
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

async function get_staffs_by_query(query: any): Promise<ReceivedStaff[]> {
	const db = (await clientPromise).db();
	let staff_collection = await db.collection("staffs");

	let staff = (await staff_collection
		.aggregate([
			{ $match: query },
			{
				$project: {
					password: 0,
				},
			},
		])
		.toArray()) as ReceivedStaff[];
	return staff;
}

export {
	get_articles_by_department,
	get_article_by_id,
	get_article_by_slug,
	get_articles_by_author,
	get_articles_by_query,
	get_staff_by_id,
	get_staff_by_position,
	get_staff_by_slug,
	get_staffs_by_query,
	get_media_by_author,
	get_articles_by_string_query,
};

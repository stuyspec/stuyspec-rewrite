import Head from "next/head";
import { RecievedArticle } from "../../ts_types/db";
import { connectToDatabase } from "../../db_conn";
import { NextPageContext } from "next";
import { ObjectId } from "mongodb";

interface Props {
	article: RecievedArticle;
}

const Article = (props: Props) => {
	const { _id, text } = props.article;

	return (
		<div>
			<Head>
				<title>Article Title</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<h2>Article id: {_id} </h2>
				<h2>Article text: {text} </h2>
			</main>
		</div>
	);
};

export default Article;

export async function getServerSideProps(context: NextPageContext) {
	const article_id: string = String(context.query.article_id);

	const { db } = await connectToDatabase();
	let articles_collection = await db.collection("articles");
	let article = await articles_collection.findOne({
		_id: new ObjectId(article_id),
	});

	return {
		props: { article: JSON.parse(JSON.stringify(article)) },
	};
}

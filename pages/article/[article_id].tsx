import Head from "next/head";
import { RecievedArticle } from "../../ts_types/db";
import { get_article_by_id } from "../../db";
import { NextPageContext } from "next";

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

	let article = await get_article_by_id(article_id);

	return {
		props: { article: JSON.parse(JSON.stringify(article)) },
	};
}

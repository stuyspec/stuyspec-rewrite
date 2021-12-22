import Head from "next/head";
import { RecievedArticle } from "../../ts_types/db_types";
import { get_article_by_id } from "../../db";
import { NextPageContext } from "next";

interface Props {
	article: RecievedArticle;
}

const Article = (props: Props) => {
	const { _id, text, title } = props.article;

	return (
		<div>
			<Head>
        <title>{ title }</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
        <h1>{ title }</h1>
				<p>{text}</p>
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

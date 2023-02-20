import Head from "next/head";
import { ReceivedArticle } from "../ts_types/db_types";

import { NextPageContext } from "next";
import styles from "../styles/SearchRoute.module.css";
import { get_articles_by_string_query } from "../db";
import ListArticleDisplay from "../components/ListArticleDisplay";

interface Props {
	articles: ReceivedArticle[];
	query: string;
}

const SearchRoute = (props: Props) => {
	return (
		<div>
			<main id={styles.main}>
				<h2>
					Showing results for: {'"'}
					{props.query}
					{'"'}
				</h2>
				<ListArticleDisplay articles={props.articles} />
			</main>
		</div>
	);
};

export default SearchRoute;

export async function getServerSideProps(context: NextPageContext) {
	let query = String(context.query.query);

	const articles = JSON.parse(
		JSON.stringify(await get_articles_by_string_query(query))
	) as ReceivedArticle[];

	if (articles) {
		return {
			props: {
				articles: articles,
				query: query,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: query },
		};
	}
}

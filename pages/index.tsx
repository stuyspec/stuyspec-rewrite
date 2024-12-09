import Head from "next/head";
import styles from "../styles/Home.module.css";
import { get_articles_by_query } from "../db";
import { ReceivedArticle } from "../ts_types/db_types";

import MixedArticleDisplay from "../components/MixedArticleDisplay";
import BannerText from "../advertisements/BannerText";
interface Props {
	articles: [ReceivedArticle];
}

async function fetch_addtional_articles(skip?: number, max?: number) {
	const request = await fetch("/api/articles", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ skip: skip, max: max }),
	});
	const json = await request.json();
	const articles = json.articles as ReceivedArticle[];
	return articles;
}

function Home(props: Props) {
	return (
		<main id={styles.main}>
			{/* <BannerText text="Read The Spectator's special issue covering all levels of the 2024 election!" url="/volume/115/issue/0" /> */}
			<MixedArticleDisplay
				articles={props.articles}
				display_department={true}
				additional_article_function={fetch_addtional_articles}
			/>
		</main>
	);
}

export default Home;

export async function getServerSideProps() {
	let articles = await get_articles_by_query({}, 42);
	return {
		props: { articles: JSON.parse(JSON.stringify(articles)) },
	};
}

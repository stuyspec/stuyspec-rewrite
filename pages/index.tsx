import Head from "next/head";
import styles from "../styles/Home.module.css";
import { get_articles } from "../db";
import { ReceivedArticle } from "../ts_types/db_types";

import MixedArticleDisplay from "../components/MixedArticleDisplay";
interface Props {
	articles: [ReceivedArticle];
}

async function fetch_addtional_articles(skip?: number, max?: number) {
	const request = await fetch("/api/articles", {
		method: "POST",
		body: JSON.stringify({ skip: skip, max: max }),
	});
	const json = await request.json();
	const articles = json.articles as ReceivedArticle[];
	return articles;
}

const Home = (props: Props) => {
	return (
		<div>
			<Head>
				<title>The Stuyvesant Spectator</title>
				<meta name="description" content="The Stuyvesant Spectator" />
			</Head>

			<main id={styles.main}>
				<MixedArticleDisplay
					articles={props.articles}
					display_department={true}
					additional_article_function={fetch_addtional_articles}
				/>
			</main>
		</div>
	);
};

export default Home;

export async function getServerSideProps() {
	let articles = await get_articles(42);
	return {
		props: { articles: JSON.parse(JSON.stringify(articles)) },
	};
}

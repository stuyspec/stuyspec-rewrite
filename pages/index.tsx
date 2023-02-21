import Head from "next/head";
import styles from "../styles/Home.module.css";
import { get_articles } from "../db";
import { ReceivedArticle } from "../ts_types/db_types";

import MixedArticleDisplay from "../components/MixedArticleDisplay";
interface Props {
	articles: [ReceivedArticle];
}

const Home = (props: Props) => {
	return (
		<div>
			<Head>
				<title>The Stuyvesant Spectator</title>
				<meta name="description" content="The Stuyvesant Spectator" />
			</Head>

			<main id={styles.main}>
				<MixedArticleDisplay articles={props.articles} />
			</main>
		</div>
	);
};

export default Home;

export async function getServerSideProps() {
	let articles = await get_articles(20);
	return {
		props: { articles: JSON.parse(JSON.stringify(articles)) },
	};
}

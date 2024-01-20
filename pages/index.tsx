import { NextPageContext } from "next";
import styles from "../styles/Home.module.css";
import { get_articles_by_query } from "../db";
import { ReceivedArticle } from "../ts_types/db_types";

import MixedArticleDisplay from "../components/MixedArticleDisplay";
import NewMixedArticleDisplay from "../components/NewMixedArticleDisplay";
interface Props {
	articles: [ReceivedArticle];
	view_mode?: string;
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
		<div>
			<main id={styles.main}>
				{props.view_mode == "new" ? (
					<>
						<NewMixedArticleDisplay articles={props.articles} />
					</>
				) : (
					<>
						<MixedArticleDisplay
							articles={props.articles}
							display_department={true}
							additional_article_function={
								fetch_addtional_articles
							}
						/>
					</>
				)}
			</main>
		</div>
	);
}

export default Home;

export async function getServerSideProps(context: NextPageContext) {
	const view_mode = context.query.view;
	let articles = await get_articles_by_query({}, 42);
	return {
		props: {
			articles: JSON.parse(JSON.stringify(articles)),
			view_mode: view_mode,
		},
	};
}

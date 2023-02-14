import { NextPageContext } from "next";
import Head from "next/head";
import GridArticleDisplay from "../../../../components/GridArticleDisplay";
import { get_articles_by_query } from "../../../../db";
import styles from "../../../../styles/Issue.module.css";
import { defaultProps, ReceivedArticle } from "../../../../ts_types/db_types";

interface Props extends defaultProps {
	articles: ReceivedArticle[];
	volume: number;
	issue: number;
}

const Issue_Component = (props: Props) => {
	return (
		<>
			<Head>
				<title>{`Volume ${props.volume} Issue ${props.issue}`}</title>
				<meta
					name="description"
					content={`Volume ${props.volume} Issue ${props.issue} by The Stuyvesant Spectator`}
				/>
			</Head>

			<main id={styles.main}>
				<h1>
					Volume {props.volume} Issue {props.issue}
				</h1>
				<GridArticleDisplay articles={props.articles} />
			</main>
		</>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	const volume = Number(context.query.volume);
	const issue = Number(context.query.issue);
	let articles = await get_articles_by_query({ volume, issue }, 50);
	articles = JSON.parse(JSON.stringify(articles));
	if (articles.length > 0) {
		return {
			props: {
				articles,
				volume,
				issue,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: { volume, issue } },
		};
	}
}

export default Issue_Component;

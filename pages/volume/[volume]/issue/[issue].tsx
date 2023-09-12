import { NextPageContext } from "next";
import Head from "next/head";
import MixedArticleDisplay from "../../../../components/MixedArticleDisplay";
import { get_articles_by_query } from "../../../../db";
import styles from "../../../../styles/Issue.module.css";
import { ReceivedArticle } from "../../../../ts_types/db_types";
import { generateMetaTags } from "../../../../utils/generateMetaTags";
import { FaRegFilePdf } from "react-icons/fa"

interface Props {
	articles: ReceivedArticle[];
	volume: number;
	issue: number;
}

const Issue_Component = (props: Props) => {
	const page_title = `Volume ${props.volume} Issue ${props.issue} - The Stuyvesant Spectator`;
	const meta_url = `https://stuyspec.com/volume/${props.volume}/issue/${props.issue}`;
	const meta_description = `Volume ${props.volume} Issue ${props.issue} at The Stuyvesant Spectator.`;
	return (
		<>
			<Head>
				{generateMetaTags(page_title, meta_description, meta_url)}
			</Head>

			<main id={styles.main}>
				<div id={styles.title_bar}>
					<h1>
						Volume {props.volume} Issue {props.issue}
					</h1>
					<a id={styles.pdf_icon_parent} href={`https://pdf.stuyspec.com/${props.volume}/${props.issue}.pdf`}>
						<FaRegFilePdf id={styles.pdf_icon} />
					</a>
				</div>
				{/* <p id={styles.view_in_print}>View this issue in print</a></p> */}
				<MixedArticleDisplay
					articles={props.articles}
					display_department
				/>
			</main>
		</>
	);
};

export async function getServerSideProps(context: NextPageContext) {
	const volume = Number(context.query.volume);
	const issue = Number(context.query.issue);
	let articles = await get_articles_by_query({ volume, issue }, 75);
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

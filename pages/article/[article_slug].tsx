import Head from "next/head";
import Image from "next/image";
import {
	ReceivedArticle,
	DepartmentsArrayDisplay,
	DepartmentsArray,
} from "../../ts_types/db_types";
import { get_article_by_slug } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[article_slug].module.css";
import ShareButton from "../../components/ShareButton";
import Link from "next/link";
import generate_contributors_jsx from "../../components/GenerateContributorsJSX";

interface Props {
	article: ReceivedArticle;
}

const Article = (props: Props) => {
	const {
		text,
		title,
		cover_image,
		section_id,
		volume,
		issue,
		contributors,
		cover_image_summary,
		cover_image_contributor,
		cover_image_source,
	} = props.article;

	const generateApproxReadingTime = () => {
		let count = text.split(" ");
		let readTime = Math.round(count.length / 250); // average reading time in min

		if (readTime === 1) {
			return <span>Reading Time: {readTime} minute</span>;
		}
		return <span>Reading Time: {readTime} minutes</span>;
	};

	const providers = ["facebook", "twitter", "linkedin", "email"];

	return (
		<div>
			<Head>
				<title>{title}</title>
			</Head>

			<main id={styles.main}>
				<div id={styles.article}>
					<p id={styles.section}>
						<Link
							href={
								"/department/" +
								String(
									DepartmentsArray[section_id]
								).toLowerCase()
							}
							passHref
						>
							{DepartmentsArrayDisplay[section_id]}
						</Link>
					</p>
					<h1 id={styles.title}>{title}</h1>
					<h3 id={styles.reading_time}>
						{generateApproxReadingTime()}
					</h3>
					<h3 id={styles.issue_volume_text}>
						<Link href={`/volume/${volume}/issue/${issue}`}>
							Issue {issue}, Volume {volume}
						</Link>
					</h3>

					<div id={styles.infoBar}>
						<h3 id={styles.authors}>
							By&nbsp;{generate_contributors_jsx(contributors)}
						</h3>

						<div id={styles.shareButtons}>
							{providers.map((provider) => (
								<ShareButton
									key={provider}
									provider={provider}
									url={`https://stuyspec.com/article/${props.article.slug}`}
								/>
							))}
						</div>
					</div>

					{cover_image /* Only check for cover image to decide visibility as some articles do not have image info */ ? (
						<>
							<div id={styles.cover_image_div}>
								<Image
									fill
									id={styles.cover_image}
									src={cover_image}
									alt="Cover Image"
									sizes="1100px"
									quality={95}
								/>
							</div>
							<div id={styles.coverImageInfo}>
								<div>{cover_image_summary}</div>
								<div>
									By&nbsp;
									{generate_contributors_jsx([
										cover_image_contributor,
									])}
								</div>
								<div>
									{" " +
										(cover_image_source
											? cover_image_source
											: "")}
								</div>
							</div>
						</>
					) : (
						<></>
					)}

					<div
						id={styles.content}
						dangerouslySetInnerHTML={{ __html: text }}
					></div>

					{/* <RecommendedArticles /> */}
				</div>
				<div id={styles.advertisements}></div>
			</main>
		</div>
	);
};

export default Article;

export async function getServerSideProps(context: NextPageContext) {
	const article_slug: string = String(context.query.article_slug);

	let article = await get_article_by_slug(article_slug);
	if (article) {
		return {
			props: { article: JSON.parse(JSON.stringify(article)) },
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: article_slug },
		};
	}
}

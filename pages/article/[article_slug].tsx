/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { ReceivedArticle } from "../../ts_types/db_types";
import { get_article_by_slug } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[article_slug].module.css";
import { all_sections } from "../../globals/globals";
import ShareButton from "../../components/ShareButton";
import romanize from "../../components/Romanize";
import SubscribeForm from "../../components/SubscribeForm";

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

	const providers = ["facebook", "twitter", "linkedin", "email"];

	return (
		<div>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.main}>
				<div id={styles.staffInfo}></div>
				<div id={styles.article}>
					<h1 id={styles.title}>{title}</h1>

					<div id={styles.infoBar}>
						<h3 id={styles.authors}>
							By {contributors.join(", ")}
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

					<div id={styles.cover_image_div}>
						<img
							width={"100%"}
							id={styles.cover_image}
							src={cover_image}
							alt="Cover Image"
						/>
					</div>
					<p id={styles.coverImageInfo}>
						{cover_image_summary}
						{cover_image_contributor +
							" " +
							(cover_image_source ? cover_image_source : "")}
					</p>

					<div
						id={styles.content}
						dangerouslySetInnerHTML={{ __html: text }}
					></div>
					<p style={{ fontStyle: "italic" }}>
						Article appears in print in Volume {romanize(volume)},
						Issue {issue}
					</p>

					<div id={styles.subsribe_insert}>
						<SubscribeForm />
					</div>
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

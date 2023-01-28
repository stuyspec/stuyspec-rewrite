/* eslint-disable @next/next/no-img-element */
import { ReceivedArticle, ReceivedStaff } from "../ts_types/db_types";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ListArticleDisplay.module.css";
import groupByImageExists from "../utils/groupArticles";
import generate_contributors_jsx from "./GenerateContributorsJSX";

export default function ListArticleDisplay(props: {
	articles: ReceivedArticle[];
}) {
	const grouping = groupByImageExists(props.articles);
	const articlesWithPhotos: ReceivedArticle[] = grouping["withPhotos"];
	const articlesWithoutPhotos: ReceivedArticle[] = grouping["withoutPhotos"];
	return (
		<section id={styles.list_view}>
			{props.articles.map((article) => (
				<div className={styles.item} key={article._id as any}>
					<Link href={"/article/" + article.slug} passHref>
						<div className={styles.inner_item}>
							<div className={styles.item_left}>
								<h2>{article.title}</h2>
								<div className={styles.authors}>
									{generate_contributors_jsx(
										article.contributors
									)}
								</div>
								<p className={styles.summary}>
									{article.summary}
								</p>
								<p className={styles.article_volume_issue}>
									{"Volume " +
										article.volume +
										" Issue " +
										article.issue}
								</p>
							</div>
							{article.cover_image ? (
								<img
									width={"100%"}
									id={styles.cover_image}
									src={article.cover_image}
									alt="Cover Image"
									className={styles.image}
								/>
							) : (
								<></>
							)}
						</div>
					</Link>
				</div>
			))}
		</section>
	);
}

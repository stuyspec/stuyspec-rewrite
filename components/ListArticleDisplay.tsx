import {
	ReceivedArticle,
	DepartmentsArray,
	DepartmentsArrayDisplay,
} from "../ts_types/db_types";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ListArticleDisplay.module.css";
import generate_contributors_jsx from "./GenerateContributorsJSX";

export default function ListArticleDisplay(props: {
	articles: ReceivedArticle[];
}) {
	return (
		<section id={styles.list_view}>
			{props.articles.map((article) => (
				<div className={styles.item} key={article._id as any}>
					<div className={styles.inner_item}>
						<div className={styles.item_left}>
							<p className={styles.department + " discrete-link"}>
								<Link
									href={`/department/${DepartmentsArray[article.section_id]
										}`}
								>
									{
										DepartmentsArrayDisplay[
										article.section_id
										]
									}
								</Link>
							</p>
							<h2>
								<Link
									href={"/article/" + article.slug}
									className="discrete-link"
									dangerouslySetInnerHTML={{ __html: article.title }}
								>
								</Link>
							</h2>
							<div className={styles.authors}>
								{generate_contributors_jsx(
									article.contributors
								)}
							</div>
							<p className={styles.summary}>
								<Link
									href={"/article/" + article.slug}
								>
									{article.summary}
								</Link>
							</p>
							<p id={styles.article_volume_issue} className="discrete-link">
								<Link
									href={`/volume/${article.volume}/issue/${article.issue}`}
								>
									Issue {article.issue}, Volume{" "}
									{article.volume}
								</Link>
							</p>
							<span>{" || "}</span>
							{(() => {
  								const date = article.created_at ? new Date(article.created_at) : null;
  								const isValidDate = date && !isNaN(date.getTime());

  								return isValidDate ? (
    								<span id={styles.month_year}>
      									{" "}
      									{date.toLocaleDateString("en-US", {
        								month: "long",
        								year: "numeric",
        								timeZone: "UTC",
      								})}
    								</span>
  								) : <span id={styles.month_year}>{article.volume + 1909}{"-"}{article.volume + 1910}</span>; // if ISOdate does not exist
							})()}
						</div>

						{article.cover_image ? (
							<div className={styles.image_div}>
								<Image
									fill
									src={article.cover_image}
									alt="Cover Image"
									className={styles.image}
								/>
							</div>
						) : (
							<></>
						)}
					</div>
				</div>
			))}
		</section>
	);
}

import {
	ReceivedArticle,
	DepartmentsArray,
	DepartmentsArrayDisplay,
} from "../ts_types/db_types";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/ListArticleDisplay.module.css";
import ArticlePreviewText from "./ArticlePreviewText";

export default function ListArticleDisplay(props: {
	articles: ReceivedArticle[];
	hideImg?: boolean;
}) {
	return (
		<section id={styles.list_view}>
			{props.articles.map((article) => (
				<div className={styles.item} key={article._id as any}>
					<div className={styles.inner_item}>
						<div className={styles.item_left}>
							<ArticlePreviewText article={article} />
						</div>

						{article.cover_image && !props.hideImg ? (
							<Link
								href={"/article/" + article.slug}
								className={styles.image_div}
							>
								<Image
									fill
									src={article.cover_image}
									alt="Cover Image"
									className={styles.image}
								/>
							</Link>
						) : (
							<></>
						)}
					</div>
				</div>
			))}
		</section>
	);
}

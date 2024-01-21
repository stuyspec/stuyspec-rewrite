import {
	DepartmentsArray,
	DepartmentsArrayDisplay,
	ReceivedArticle,
} from "@/ts_types/db_types";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/MixedArticleSections.module.css";
import groupByImageExists from "@/utils/groupArticles";
import generate_contributors_jsx from "@/components/GenerateContributorsJSX";
import Advertisment from "@/components/Advertisement";
import advertisements from "../../advertisements";
import ListArticleDisplay from "../ListArticleDisplay";
import ArticlePreviewText from "../ArticlePreviewText";

export default function SectionAB(props: { articles: ReceivedArticle[] }) {
	let grouped = groupByImageExists(props.articles);

	//  TODO: Responsiveness under 1070px

	let min_section_b = 6; // minimum articles on the right side
	if (grouped.withoutPhotos.length < min_section_b) {
		const diff = min_section_b - grouped.withoutPhotos.length;
		const spliced = grouped.withPhotos.splice(
			grouped.withPhotos.length - diff - 1,
			diff
		);
		grouped.withoutPhotos = [...spliced, ...grouped.withoutPhotos];
	}

	const generateArticlePreviewWithImg = (article: ReceivedArticle) => {
		return (
			<div className={styles.item} key={article._id as any}>
				<Link href={"/article/" + article.slug}>
					<Image
						fill
						src={article.cover_image}
						alt="Cover Image"
						className={styles.image}
					/>
				</Link>
				<ArticlePreviewText
					article={article}
					hideIssue={true}
					hideDepartment={true}
				/>
			</div>
		);
	};

	return (
		<div className={styles.section_ab_container}>
			<div className={styles.section_a}>
				<div className={styles.section_a_left} key="left">
					{grouped.withPhotos
						.slice(0, 3)
						.map(generateArticlePreviewWithImg)}
				</div>
				<div className={styles.section_a_right} key="right">
					{grouped.withPhotos
						.slice(3)
						.map(generateArticlePreviewWithImg)}
				</div>
			</div>
			<div className={styles.section_b}>
				{grouped.withoutPhotos.map((article) => (
					<div className={styles.item} key={article._id as any}>
						<div className={styles.item_inner}>
							<ArticlePreviewText
								article={article}
								hideIssue={true}
								hideDepartment={true}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

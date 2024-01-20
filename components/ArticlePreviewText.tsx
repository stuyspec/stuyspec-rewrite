import {
	ReceivedArticle,
	DepartmentsArray,
	DepartmentsArrayDisplay,
} from "@/ts_types/db_types";
import Link from "next/link";
import generate_contributors_jsx from "./GenerateContributorsJSX";
import styles from "../styles/ArticlePreviewText.module.css";

export default function ArticlePreviewText(props: {
	article: ReceivedArticle;
	hideDepartment?: boolean;
	hideIssue?: boolean;
}) {
	const article = props.article;
	return (
		<>
			<p
				className={styles.department + " discrete-link"}
				style={{ display: props.hideDepartment ? "none" : "" }}
			>
				<Link
					href={`/department/${DepartmentsArray[article.section_id]}`}
				>
					{DepartmentsArrayDisplay[article.section_id]}
				</Link>
			</p>
			<h2>
				<Link
					href={"/article/" + article.slug}
					className="discrete-link"
				>
					{article.title}
				</Link>
			</h2>
			<div className={styles.authors}>
				{generate_contributors_jsx(article.contributors)}
			</div>
			<p className={styles.summary}>
				<Link
					href={"/article/" + article.slug}
					className="discrete-link"
				>
					{article.summary}
				</Link>
			</p>
			<p
				className={styles.article_volume_issue}
				style={{ display: props.hideIssue ? "none" : "" }}
			>
				<Link href={`/volume/${article.volume}/issue/${article.issue}`}>
					Issue {article.issue}, Volume {article.volume}
				</Link>
			</p>
		</>
	);
}

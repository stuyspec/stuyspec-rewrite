import {
	DepartmentsArray,
	DepartmentsArrayDisplay,
	ReceivedArticle,
} from "../ts_types/db_types";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/NewMixedArticleDisplay.module.css";
import groupByImageExists from "../utils/groupArticles";
import generate_contributors_jsx from "./GenerateContributorsJSX";
import Advertisment from "./Advertisement";
import advertisements from "../advertisements";

export default function NewMixedArticleDisplay(props: {
	articles: ReceivedArticle[];
}) {
	return (
		<div id={styles.new_mixed_article_view_container}>
			<h1>New Mixed Article View</h1>
		</div>
	);
}

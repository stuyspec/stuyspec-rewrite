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
import SectionAB from "@/components/MixedArticleSections/SectionAB";

export default function NewMixedArticleDisplay(props: {
	articles: ReceivedArticle[];
}) {
	return (
		<div id={styles.new_mixed_article_view_container}>
			<SectionAB articles={props.articles.slice(0, 10)} />
		</div>
	);
}

import { ReceivedArticle } from "../ts_types/db_types";
import styles from "../styles/NewMixedArticleDisplay.module.css";
import groupByImageExists from "../utils/groupArticles";
import Advertisment from "./Advertisement";
import advertisements from "../advertisements";
import SectionAB from "@/components/MixedArticleSections/SectionAB";

export default function NewMixedArticleDisplay(props: {
	articles: ReceivedArticle[];
}) {
	return (
		<div id={styles.new_mixed_article_view_container}>
			<SectionAB articles={props.articles.slice(0, 12)} />
			<SectionAB articles={props.articles.slice(12, 24)} />
			<SectionAB articles={props.articles.slice(24, 36)} />
		</div>
	);
}

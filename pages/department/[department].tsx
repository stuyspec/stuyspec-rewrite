import Head from "next/head";
import {
	Department,
	DepartmentsArray,
	DepartmentsArrayDisplay,
	ReceivedArticle,
} from "../../ts_types/db_types";
import { get_articles_by_department } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[department].module.css";
import MixedArticleDisplay from "../../components/MixedArticleDisplay";
import { generateMetaTags } from "../../utils/generateMetaTags";

interface Props {
	articles: ReceivedArticle[];
	department_display: string;
	section_id: number;
}

function Article(props: Props) {
	const page_title = props.department_display + " - The Stuyvesant Spectator";
	const meta_url =
		`https://stuyspec.com/department/` + DepartmentsArray[props.section_id];
	const meta_description = `The ${props.department_display} department at The Stuyvesant Spectator.`;

	const fetch_addtional_articles = async (skip?: number, max?: number) => {
		const request = await fetch("/api/articles", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: { section_id: props.section_id },
				skip: skip,
				max: max,
			}),
		});
		const json = await request.json();
		const articles = json.articles as ReceivedArticle[];
		return articles;
	};
	return (
		<div>
			<Head>
				{generateMetaTags(page_title, meta_description, meta_url)}
			</Head>

			<main id={styles.main}>
				<h1 id={styles.departmentTitle}>{props.department_display}</h1>
				<MixedArticleDisplay
					articles={props.articles}
					display_department={false}
					additional_article_function={fetch_addtional_articles}
				/>
			</main>
		</div>
	);
};

export default Article;

export async function getServerSideProps(context: NextPageContext) {
	let department_param = String(
		context.query.department
	).toLowerCase() as Department;

	const department_id = DepartmentsArray.findIndex(
		(a) => a == department_param
	);
	if (department_id == -1) {
		// If there is no department found with that param, 404
		return {
			notFound: true,
			props: { attempted_identifier: department_param },
		};
	}

	const department_display = DepartmentsArrayDisplay[department_id];

	let articles = await get_articles_by_department(department_param, 42);
	if (articles.length > 0) {
		return {
			props: {
				articles: JSON.parse(JSON.stringify(articles)),
				department_display: department_display,
				section_id: department_id,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: department_param },
		};
	}
}

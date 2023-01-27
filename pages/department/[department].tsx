/* eslint-disable @next/next/no-img-element */
import Head from "next/head";

import {
	defaultProps,
	Department,
	DepartmentsArray,
	DepartmentsArrayDisplay,
	ReceivedArticle,
} from "../../ts_types/db_types";
import { get_articles_by_department } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[department].module.css";
import GridArticleDisplay from "../../components/GridArticleDisplay";

interface Props extends defaultProps {
	articles: ReceivedArticle[];
	department_display: string;
}

const Article = (props: Props) => {
	return (
		<div>
			<Head>
				<title>{props.department_display}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.main}>
				<h1 id={styles.departmentTitle}>{props.department_display}</h1>
				<GridArticleDisplay articles={props.articles} />
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

	let articles = await get_articles_by_department(department_param, 30);
	if (articles) {
		return {
			props: {
				articles: JSON.parse(JSON.stringify(articles)),
				department_display: department_display,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: department_param },
		};
	}
}

import Head from "next/head";
import {
	Department,
	DepartmentsArray,
	DepartmentsArrayDisplay,
	ReceivedArticle,
} from "../../../ts_types/db_types";
import { get_articles_by_query } from "../../../db";
import { NextPageContext } from "next";
import styles from "../../../styles/[department].module.css";
import GridArticleDisplay from "../../../components/GridArticleDisplay";

interface Props {
	articles: ReceivedArticle[];
	sub_section: string;
	department: string;
}

const SubSection = (props: Props) => {
	return (
		<div>
			<Head>
				<title>{props.sub_section}</title>
			</Head>

			<main id={styles.main}>
				<h1 id={styles.departmentTitle}>
					{props.sub_section} by {props.department}
				</h1>
				<GridArticleDisplay articles={props.articles} />
			</main>
		</div>
	);
};

export default SubSection;

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

	let sub_section_param = String(context.query.sub_section).toLowerCase();

	let articles = await get_articles_by_query(
		{ sub_section: sub_section_param },
		100
	);
	if (articles) {
		return {
			props: {
				articles: JSON.parse(JSON.stringify(articles)),
				sub_section: sub_section_param,
				department: DepartmentsArrayDisplay[department_id],
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: sub_section_param },
		};
	}
}

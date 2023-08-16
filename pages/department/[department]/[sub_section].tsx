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
import MixedArticleDisplay from "../../../components/MixedArticleDisplay";
import { generateMetaTags } from "../../../utils/generateMetaTags";

interface Props {
	articles: ReceivedArticle[];
	sub_section: string;
	department: string;
	department_id: number;
}

const SubSection = (props: Props) => {
	const sub_section_display =
		props.sub_section.charAt(0).toUpperCase() + props.sub_section.slice(1);

	const page_title = sub_section_display + " - The Stuyvesant Spectator";
	const meta_url = `https://stuyspec.com/department/${
		DepartmentsArray[props.department_id]
	}/${props.sub_section}`;
	const meta_description = `${sub_section_display} at The Stuyvesant Spectator.`;

	const fetch_addtional_articles = async (skip?: number, max?: number) => {
		const request = await fetch("/api/articles", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: { sub_section: props.sub_section },
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
				<h1 id={styles.departmentTitle}>
					<span id={styles.sub_section}>{sub_section_display}</span>
				</h1>
				<MixedArticleDisplay
					articles={props.articles}
					display_department={true}
					additional_article_function={fetch_addtional_articles}
				/>
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
		42
	);
	if (articles.length > 0) {
		return {
			props: {
				articles: JSON.parse(JSON.stringify(articles)),
				sub_section: sub_section_param,
				department: DepartmentsArrayDisplay[department_id],
				department_id: department_id,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: sub_section_param },
		};
	}
}

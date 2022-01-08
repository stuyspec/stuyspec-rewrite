import Head from "next/head";
import Image from "next/image";
import { Department, ReceivedArticle } from "../../ts_types/db_types";
import { get_articles_by_department } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[department].module.css";

interface Props {
	articles: ReceivedArticle[];
	department: string;
}

const Article = (props: Props) => {
	console.log("department props: ", props);
	return (
		<div>
			<Head>
				<title>{props.department}</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.main}>
				<h1 id={styles.departmentTitle}> {props.department} </h1>
				<div id={styles.devDisplay}>
					<h2>Development Display</h2>
					{props.articles.length > 0 ? (
						<div>
							{props.articles.map((v) => (
								<div key={v._id as any}>
									<h3>{v.title}</h3>
									<h4>By {v.contributors.join(", ")}</h4>
								</div>
							))}
						</div>
					) : (
						<div>
							<h2>
								No articles were found under that department
							</h2>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default Article;

export async function getServerSideProps(context: NextPageContext) {
	const department = context.query.department as Department;

	let articles = await get_articles_by_department(department);
	if (articles) {
		return {
			props: {
				articles: JSON.parse(JSON.stringify(articles)),
				department: department,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: department },
		};
	}
}

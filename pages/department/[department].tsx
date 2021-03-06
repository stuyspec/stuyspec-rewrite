import Head from "next/head";
import Image from "next/image";
import { Department, ReceivedArticle } from "../../ts_types/db_types";
import { get_articles_by_department } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[department].module.css";
import Link from "next/link";
import generate_contributors_jsx from "../../utils/GenerateContributorsJSX";

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
								<Link
									key={v._id as any}
									href={"/article/" + v.slug}
									passHref
								>
									<div>
										<h3>{v.title}</h3>
										<h4 id={styles.authors_div}>
											By&nbsp;
											{generate_contributors_jsx(
												v.contributors
											)}
										</h4>
									</div>
								</Link>
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
	let department = String(
		context.query.department
	).toLowerCase() as Department;

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

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import {
	Department,
	DepartmentsArray,
	DepartmentsArrayDisplay,
	ReceivedArticle,
} from "../../ts_types/db_types";
import { get_articles_by_query } from "../../db";
import { NextPageContext } from "next";
import styles from "../../styles/[department].module.css";
import { generateMetaTags } from "../../utils/generateMetaTags";
import ListArticleDisplay from "../../components/ListArticleDisplay";

interface Props {
	articles: ReceivedArticle[];
}

export default function Page(props: Props) {
	const page_title =
		"Israeli-Palestinian conflict - The Stuyvesant Spectator";
	const meta_url = `https://stuyspec.com/topic/israel-palestine`;
	const meta_description = `Israeli-Palestinian conflict coverage at The Stuyvesant Spectator.`;
	return (
		<>
			<Head>
				{generateMetaTags(page_title, meta_description, meta_url)}
			</Head>
			<main id={styles.main}>
				<hgroup className={styles.departmentHeadingContainer}>
					<h1 id={styles.departmentTitle}>
						Israeli-Palestinian conflict
					</h1>
					<p>
						The Stuyvesant Spectator's coverage relating to the
						Israeli-Palestinian conflict following the start of the
						Israel-Hamas war since October 7.
					</p>
				</hgroup>
				<ListArticleDisplay articles={props.articles} />
			</main>
		</>
	);
}

export const getServerSideProps = (async () => {
	let articles = await get_articles_by_query(
		{ sub_section: "israel-hamas-war" },
		42
	);
	return { props: { articles: JSON.parse(JSON.stringify(articles)) } };
}) satisfies GetServerSideProps<Props>;

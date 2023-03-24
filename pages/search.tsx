import Head from "next/head";
import { ReceivedArticle, ReceivedStaff } from "../ts_types/db_types";

import { NextPageContext } from "next";
import styles from "../styles/SearchRoute.module.css";
import { get_articles_by_string_query, get_staffs_by_query } from "../db";
import ListArticleDisplay from "../components/ListArticleDisplay";
import Link from "next/link";

interface Props {
	articles: ReceivedArticle[];
	query: string;
	staff: ReceivedStaff[];
}

const SearchRoute = (props: Props) => {
	return (
		<div>
			<main id={styles.main}>
				<h1 id={styles.heading}>
					Showing {props.articles.length + props.staff.length} results
					for: {'"'}
					{props.query}
					{'"'}
				</h1>
				{props.staff.length > 0 ? (
					<>
						<h2>{props.staff.length} staff members found: </h2>
						<section id={styles.returned_staff}>
							{props.staff.map((staff_member, index) => (
								<div key={index}>
									<h1 id={styles.name}>
										<Link
											href={
												"/staff/" +
												encodeURIComponent(
													staff_member.slug
												)
											}
										>
											{staff_member.name}{" "}
											<span id={styles.slug}>
												({staff_member.slug})
											</span>
										</Link>
									</h1>

									<a
										href={"mailto:" + staff_member.email}
										id={styles.email}
									>
										{staff_member.email}
									</a>
								</div>
							))}
						</section>
					</>
				) : (
					<></>
				)}
				<h2 id={styles.articles_found_label}>
					{props.articles.length} articles found:{" "}
				</h2>
				<ListArticleDisplay articles={props.articles} />
			</main>
		</div>
	);
};

export default SearchRoute;

export async function getServerSideProps(context: NextPageContext) {
	let query = String(context.query.query);

	const articles = JSON.parse(
		JSON.stringify(await get_articles_by_string_query(query, 20))
	) as ReceivedArticle[];

	const staff = JSON.parse(
		JSON.stringify(
			await get_staffs_by_query({
				$text: { $search: query },
			})
		)
	);

	if (articles) {
		return {
			props: {
				articles: articles,
				query: query,
				staff: staff,
			},
		};
	} else {
		return {
			notFound: true,
			props: { attempted_identifier: query },
		};
	}
}

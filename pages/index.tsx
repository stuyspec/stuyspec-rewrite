/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { get_articles } from "../db";
import {
	ReceivedArticle,
	mongoObjectId,
	ReceivedStaff,
} from "../ts_types/db_types";
import { all_sections } from "../globals/globals";
import Separator from "../components/Separator";
import dateFromID from "../utils/dateFromID";
import generate_contributors_jsx from "../components/GenerateContributorsJSX";
interface Props {
	articles: [ReceivedArticle];
}

const Home = (props: Props) => {
	// console.log("Props: ", props);
	const displayArticles: any[] = []; // Any type because this element will change often
	const articles = props.articles;

	articles.forEach((article_iterator) => {
		displayArticles.push(
			<div id={styles.article} key={String(article_iterator._id)}>
				<Link passHref href={"/article/" + article_iterator.slug}>
					<h2 id={styles.title} className="discrete-link">
						{article_iterator.title}
					</h2>
				</Link>
				<div
					className={styles.authors}
					style={{ fontFamily: "var(--secondary-font)" }}
				>
					{generate_contributors_jsx(article_iterator.contributors)}
				</div>
				<p id={styles.articleInfoDate}>
					{dateFromID(article_iterator._id)}
				</p>
				<p id={styles.summary}>{article_iterator.summary}</p>
				<Link
					href={`/department/${
						all_sections[article_iterator.section_id]
					}`}
					passHref
				>
					<p
						id={styles.articleInfo}
						className="discrete-link"
						style={{ fontFamily: "var(--secondary-font)" }}
					>
						{all_sections[article_iterator.section_id]}
					</p>
				</Link>
			</div>
		);
	});

	const heroArticle = articles[articles.length - 1];

	return (
		<div>
			<Head>
				<title>The Stuyvesant Spectator</title>
				<meta name="description" content="The Stuyvesant Spectator" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.main}>
				<div id={styles.landingScreen}>
					<div id={styles.heroStory}>
						<div id={styles.heroImageContainer}>
							<img
								alt="big image"
								id={styles.heroImage}
								src={heroArticle.cover_image}
							/>
							<div id={styles.departmentBar}>
								<Link
									href={`/department/${
										all_sections[heroArticle.section_id]
									}`}
									passHref
								>
									{all_sections[heroArticle.section_id]}
								</Link>
							</div>
						</div>

						<Link passHref href={"/article/" + heroArticle.slug}>
							<h1 className="discrete-link">
								{heroArticle.title}
							</h1>
						</Link>

						<div
							className={styles.authors}
							style={{
								justifyContent: "center",
							}}
						>
							{generate_contributors_jsx(
								heroArticle.contributors
							)}
						</div>
						<p id={styles.summary}>{heroArticle.summary}</p>
						<Image
							alt="down arrow"
							src="/images/down-arrow.svg"
							width="24px"
							height="24px"
						/>
					</div>

					<div id={styles.infoBar}>
						<table id={styles.announcements_table}>
							<tbody>
								<tr>
									<td>Alfreds Futterkiste</td>
									<td>Maria Anders</td>
								</tr>
								<tr>
									<td>Centro comercial Moctezuma</td>
									<td>Francisco Chang</td>
								</tr>
							</tbody>
						</table>
					</div>

					<div id={styles.latestArticles}>
						<h1 id={styles.heading}>Latest</h1>
						<Separator />
						<div>
							{displayArticles
								.slice(
									displayArticles.length - 3,
									displayArticles.length - 1
								)
								.reverse()}
						</div>
					</div>
				</div>
				<div id={styles.articles}></div>
				<div id={styles.articles}></div>
			</main>
		</div>
	);
};

export default Home;

export async function getServerSideProps() {
	let articles = await get_articles();
	return {
		props: { articles: JSON.parse(JSON.stringify(articles)) },
	};
}

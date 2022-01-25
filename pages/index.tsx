/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { get_articles } from "../db";
import { ReceivedArticle, mongoObjectId } from "../ts_types/db_types";
import { all_sections } from "../globals/globals";
import Separator from "../components/Separator";
interface Props {
	articles: [ReceivedArticle];
}
function dateFromID(objectId: mongoObjectId) {
	objectId = String(objectId);
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000)
		.toString()
		.split(" ")
		.slice(0, 4)
		.join(" ");
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
					id={styles.inline}
					style={{ fontFamily: "var(--secondary-font)" }}
				>
					{article_iterator.contributors.map(
						(contributor: string, index: number) => {
							let separator = ", ";
							if (
								index ===
								article_iterator.contributors.length - 2
							) {
								separator = " & ";
							} else if (
								index ===
								article_iterator.contributors.length - 1
							) {
								separator = "";
							}

							return (
								<div key={index}>
									<p
										id={styles.articleInfoWriters}
										style={{ color: "var(--primary)" }}
										className="discrete-link"
										key={contributor}
									>
										{contributor}
									</p>
									<p id={styles.contributorSeparator}>
										{separator}
									</p>
								</div>
							);
						}
					)}
					<p
						id={styles.articleInfoDate}
						style={{ marginLeft: "1rem" }}
					>
						{dateFromID(article_iterator._id)}
					</p>
				</div>
				<p id={styles.summary}>{article_iterator.summary}</p>
				<Link
					href={`/department/${
						all_sections[article_iterator.section_id]
					}`}
					passHref
				>
					<p id={styles.articleInfo} className="discrete-link">
						{all_sections[article_iterator.section_id]}
					</p>
				</Link>
			</div>
		);
	});

	const heroArticle = articles[0];

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
								{all_sections[heroArticle.section_id]}
							</div>
						</div>

						<Link passHref href={"/article/" + heroArticle.slug}>
							<h1 className="discrete-link">
								{heroArticle.title}
							</h1>
						</Link>

						<p id={styles.writers}>
							{heroArticle.contributors.join(", ")}
						</p>
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
						<div>{displayArticles.slice(1)}</div>
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

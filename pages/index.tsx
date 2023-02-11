import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { get_articles } from "../db";
import {
	ReceivedArticle,
	mongoObjectId,
	ReceivedStaff,
	defaultProps,
} from "../ts_types/db_types";
import { all_sections } from "../globals/globals";
import Separator from "../components/Separator";
import dateFromID from "../utils/dateFromID";
import generate_contributors_jsx from "../components/GenerateContributorsJSX";
interface Props extends defaultProps {
	articles: [ReceivedArticle];
}

const Home = (props: Props) => {
	// console.log("Props: ", props);
	const displayArticles: any[] = []; // Any type because this element will change often
	const articles = props.articles;

	// Find hero article
	let heroArticleIndex = articles.length - 1; // Default to the last article
	for (let i = articles.length - 1; i >= 0; i--) {
		const article = articles[i];
		if (article.cover_image_contributor) {
			heroArticleIndex = i;
			break;
		}
	}
	let heroArticle = articles[heroArticleIndex];

	articles
		.slice(0) // .slice(0) first so that we make a copy of the articles array to mutate later with the second .splice()
		.slice(0, heroArticleIndex)
		.forEach((article_iterator, index) => {
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
						{generate_contributors_jsx(
							article_iterator.contributors
						)}
					</div>
					<p id={styles.articleInfoDate}>
						{dateFromID(article_iterator._id)}
					</p>
					<Link passHref href={"/article/" + article_iterator.slug}>
						<p id={styles.summary} className="discrete-link">
							{article_iterator.summary}
						</p>
					</Link>
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
							<Link
								passHref
								href={"/article/" + heroArticle.slug}
							>
								<Image
									alt="big image"
									id={styles.heroImage}
									src={heroArticle.cover_image}
									sizes="800px"
									quality={90}
									fill
								/>
							</Link>
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
						<Link passHref href={"/article/" + heroArticle.slug}>
							<p className="discrete-link" id={styles.summary}>
								{heroArticle.summary}
							</p>
						</Link>
						<Link passHref href={"/article/" + heroArticle.slug}>
							<span>
								<Image
									id={styles.down_arrow}
									alt="down arrow"
									src="/images/down-arrow.svg"
									width={24}
									height={24}
								/>
							</span>
						</Link>
					</div>

					<div id={styles.latestArticles}>
						<h1 id={styles.heading}>Latest</h1>
						<Separator />
						<div>
							{displayArticles
								.slice(
									displayArticles.length - 5,
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

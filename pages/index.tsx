import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { get_articles } from "../db";
import { RecievedArticle } from "../ts_types/db_types";
interface Props {
	articles: [RecievedArticle];
}

const Home = (props: Props) => {
	console.log("Props: ", props);
	const displayArticles: any[] = []; // Any type because this element will change often
	const articles = props.articles;
	articles.forEach((i) => {
		displayArticles.push(
			<div className={styles.displayed_article} key={String(i.title)}>
				<Link href={"/article/" + i._id} passHref>
					<div>
						<h2 className={styles.mini_article_title}>{i.title}</h2>
						<p>{i.text}</p>
					</div>
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

			<main className={styles.main}>
				{/* <h1 id={styles.title}>
					Welcome to the stuy spec rewrite in Typescript
				</h1> */}
				<div>{displayArticles}</div>
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

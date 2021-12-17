import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { connectToDatabase } from "../db_conn";
import { get_articles } from "../db";
import { RecievedArticle } from "../ts_types/db";
interface Props {
	articles: [RecievedArticle];
}

const Home = (props: Props) => {
	console.log("Props: ", props);
	const displayArticles: any[] = []; // Any type because this element will change often
	const articles = props.articles;
	articles.forEach((i) => {
		displayArticles.push(
			<div className={styles.displayed_article} key={String(i._id)}>
				<Link href={"/article/" + i._id} passHref>
					<div>
						<h2>{i._id}</h2>
						<h3>{i.text}</h3>
					</div>
				</Link>
			</div>
		);
	});
	return (
		<div>
			<Head>
				<title>StuySpec Rewrite</title>
				<meta name="description" content="The Stuyvesant Spectator" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1>Welcome to the stuy spec rewrite in Typescript</h1>
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

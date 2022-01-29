import Head from "next/head";
import styles from "../styles/Subscribe.module.css";
import SubscribeForm from "../components/SubscribeForm";

const Subscribe = () => {
	return (
		<>
			<Head>
				<title>Subscribe | The Spectator</title>
				<meta name="description" content="The Stuyvesant Spectator" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.container}>
				<h1 id={styles.heading}>Subscribe</h1>
				<p id={styles.text}>
					Subscribe to The Spectator&apos;s biweekly newsletter!
				</p>
				<SubscribeForm />
			</main>
		</>
	);
};

export default Subscribe;

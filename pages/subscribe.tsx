import Head from "next/head";
import styles from "../styles/Subscribe.module.css";
import SubscribeForm from "../components/SubscribeForm";
import { generateMetaTags } from "../utils/generateMetaTags";

function Subscribe() {
	const page_title = "Subscribe - The Stuyvesant Spectator";
	const meta_url = `https://stuyspec.com/subscribe`;
	const meta_description = `Subscribe to The Stuyvesant Spectator's biweekly newsletter.`;

	return (
		<>
			<Head>
				{generateMetaTags(page_title, meta_description, meta_url)}
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

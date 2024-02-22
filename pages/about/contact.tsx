import Head from "next/head";
import { generateMetaTags } from "../../utils/generateMetaTags";
import styles from "../../styles/About.module.css";

function ContactPage() {
	const page_title = "Contact - The Stuyvesant Spectator";
	const meta_url = `https://stuyspec.com/about/contact`;
	const meta_description = `Contact The Stuyvesant Spectator.`;

	return (
		<>
			<Head>
				{generateMetaTags(page_title, meta_description, meta_url)}
			</Head>
			<div
				className={styles.contactPage}
			>

				<div className={styles.contactPageLinksContainer}>
					<h1>Contact Us</h1>
					<p>
						For website related questions: Contact{" "}
						<a className="link" href="mailto:web@stuyspec.com">
							web@stuyspec.com
						</a>
						.
					</p>
					<p >
						For all other questions: Contact{" "}
						<a
							className="link"
							href="mailto:eics@stuyspec.com"
						>
							eics@stuyspec.com
						</a>
						.
					</p>
				</div>
			</div>
		</>
	);
};

export default ContactPage;

import Head from "next/head";
import { generateMetaTags } from "../../utils/generateMetaTags";

const ContactPage = () => {
	const page_title = "Contact - The Stuyvesant Spectator";
	const meta_url = `https://stuyspec.com/about/contact`;
	const meta_description = `Contact The Stuyvesant Spectator.`;

	return (
		<>
			<Head>
				{generateMetaTags(page_title, meta_description, meta_url)}
			</Head>
			<div
				style={{
					textAlign: "center",
					display: "flex",
					height: "calc(100vh - 172px)",
				}}
				className="contact-page"
			>
				<div style={{ margin: "auto" }}>
					<h1>Contact Us</h1>
					<p style={{ marginTop: "32px", fontFamily: "Georgia" }}>
						For website related questions: Contact{" "}
						<a className="link" href="mailto:web@stuyspec.com">
							web@stuyspec.com
						</a>
						.
					</p>
					<p style={{ marginTop: "8px", fontFamily: "Georgia" }}>
						For all other questions: Contact{" "}
						<a
							className="link"
							href="mailto:rebeccaphoebe23@gmail.com"
						>
							rebeccaphoebe23@gmail.com
						</a>
						.
					</p>
				</div>
			</div>
		</>
	);
};

export default ContactPage;

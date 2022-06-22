/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/ItemGrid.module.css";

const Fourzerofour = (props: any) => {
	const pages: Array<{
		name: string;
		link: string;
		summary: string;
		image: string;
	}> = [
		{
			name: "Our Charter",
			link: "/our-charter",
			summary:
				"Curious about our policies? Learn more by reading the charter of the Stuyvesant Spectator.",
			image: "string",
		},
		{
			name: "Advertise",
			link: "/advertise",
			summary:
				"Considering posting an advertisement? Learn more about how you can advertise on The Stuyvesant Spectator's website.",
			image: "string",
		},
		{
			name: "Sponsors",
			link: "/sponsors",
			summary:
				"Considering sponsoring us? Learn more about how you can sponsor us here.",
			image: "string",
		},
		{
			name: "Staff",
			link: "/staff",
			summary: "Learn more about our current or past staff members.",
			image: "string",
		},
		{
			name: "Developers",
			link: "/developers",
			summary:
				"Learn more about the developers behind The Stuyvesant Spectator's website.",
			image: "string",
		},
		{
			name: "Contact",
			link: "/contact",
			summary: "Want to contact us? Get in touch.",
			image: "string",
		},
	];

	return (
		<div>
			<Head>
				<title>Error!</title>
				<meta name="description" content="The Stuyvesant Spectator" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.container}>
				<h1 id={styles.textCentered}>About Us</h1>
				<div id={styles.grid}>
					{pages.map((page, key) => (
						<div id={styles.item} key={key}>
							<a href={`/about${page.link}`}>
								<img
									id={styles.image}
									src={`https://cdn.discordapp.com/attachments/899120514801496074/931962289765109860/wQphsDZeCTdygAAAABJRU5ErkJggg.png`}
								/>
								<h2>{page.name}</h2>
								<p>{page.summary}</p>
							</a>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default Fourzerofour;

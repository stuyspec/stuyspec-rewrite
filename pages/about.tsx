import Head from "next/head";
import styles from "../styles/AboutItemGrid.module.css";
import Image from "next/image";
import one_hundred_years_logo from "../public/images/100years_logo.png";
import Link from "next/link";

const AboutUs = (props: any) => {
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
				<title>About Us</title>
				<meta name="description" content="The Stuyvesant Spectator" />
			</Head>

			<main id={styles.container}>
				<h1 id={styles.textCentered}>About Us</h1>
				<div id={styles.grid}>
					{pages.map((page, key) => (
						<div id={styles.item} key={key}>
							<Link passHref href={`/about${page.link}`}>
								<>
									<Image
										id={styles.image}
										alt="The Stuyvesant Spectator: 100 years of journalism"
										src={one_hundred_years_logo}
									/>
									<h2>{page.name}</h2>
									<p>{page.summary}</p>
								</>
							</Link>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default AboutUs;

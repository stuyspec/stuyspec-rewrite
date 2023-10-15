import Head from "next/head";
import styles from "../../styles/Developers.module.css";
import { generateMetaTags } from "../../utils/generateMetaTags";

function DevelopersPage() {
	const developers: Array<{
		name: string;
		role: string;
		year: string;
		image: string;
		github: string;
	}> = [
			{
				name: "Leonid Metlitsky",
				role: "Developer",
				year: "2025",
				github: "leomet07",
				image: "https://cdn.discordapp.com/avatars/426703074157920266/d3490e284e9254345f7e23158b5d6686.webp?size=256",
			},
			{
				name: "David Chen",
				role: "Editor",
				year: "2023",
				github: "dchen278",
				image: "https://cdn.discordapp.com/attachments/854398680835948544/925432531959054346/unknown.png",
			},
			{
				name: "Ivan Chen",
				role: "Designer & Developer",
				year: "2024",
				github: "anivanchen",
				image: "https://cdn.discordapp.com/avatars/695729168343629844/f4df801dc96eb786fa050272ba5fdfac.webp?size=256",
			},
		];

	const page_title = "Developers - The Stuyvesant Spectator";
	const meta_url = `https://stuyspec.com/about/developers`;
	const meta_description = `Developers for The Stuyvesant Spectator.`;

	return (
		<>
			<Head>
				{generateMetaTags(page_title, meta_description, meta_url)}
			</Head>
			<div id={styles.main}>
				<div id={styles.body}>
					<h1>Developers</h1>
					<section>
						{developers.map((v) => (
							<div key={v.github} className={styles.developer}>
								<h2>
									<a href={"https://github.com/" + v.github}>
										{v.name}
									</a>
								</h2>
								<p>Class of {v.year}</p>
							</div>
						))}
					</section>
				</div>
			</div>
		</>
	);
};

export default DevelopersPage;

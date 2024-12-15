import Head from "next/head";
import styles from "../../styles/Staff.module.css";
import { generateMetaTags } from "../../utils/generateMetaTags";

function StaffPage() {
	const page_title = "Staff - The Stuyvesant Spectator";
	const meta_url = `https://stuyspec.com/about/staff`;
	const meta_description = `The members of The Stuyvesant Spectator's 2024-2025 Editorial Board.`;

	return (
		<>
			<Head>
				{generateMetaTags(page_title, meta_description, meta_url)}
			</Head>
			<main id={styles.main}>
				<h1>Members of the 2023-2024 Spectator Editorial Board</h1>
				<section id={styles.departments}>
					<p className={styles.special_def}>* Managing Board</p>
					<p className={styles.special_def}>** Editors-in-Training</p>

					<div>
						<h3 className={styles.EIC}>Editors In Chief</h3>
						<p>Suyeon Ryu*</p>
						<p>Khush Wadhwa*</p>
					</div>
					<div>
						<h3 className={styles.news}>News Editors</h3>
						<p>Talia Arcasoy*</p>
						<p>Seth Fenton*</p>
						<p>Zoey Marcus</p>
						<p>Brendan Tan</p>
						<p>Lauren Yang</p>
					</div>
					<div>
						<h3 className={styles.features}>Features Editors</h3>
						<p>Abigail Jin</p>
						<p>Hifza Kaleem</p>
						<p>Cathleen Xi</p>
					</div>
					<div>
						<h3 className={styles.ops}>Opinions Editors</h3>
						<p>Joanne Hwang</p>
						<p>Helen Mancini*</p>
						<p>Amaryllis Sun</p>
						<p>Myles Vuong</p>
					</div>
					<div>
						<h3 className={styles.science}>Science Editors</h3>
						<p>Aarya Balakrishnan</p>
						<p>Sonya Cisse</p>
						<p>Ryan Lin</p>
						<p>Michelle Ng</p>
					</div>
					<div>
						<h3 className={styles.ae}>Arts & Entertainment Editors</h3>
						<p>Benson Chen</p>
						<p>Zoë Feigelson</p>
						<p>Madeline Hutchinson</p>
						<p>Emile Lee-Suk</p>
						<p>Santino Suarez*</p>
					</div>
					<div>
						<h3 className={styles.humor}>Humor Editors</h3>
						<p>Michelle “Mike” Huang</p>
						<p>Munem Tajwar</p>
					</div>
					<div>
						<h3 className={styles.sports}>Sports Editors</h3>
						<p>Elijah Choi</p>
						<p>Leonardo Guidi</p>
						<p>Kaileen So</p>
						<p>Evan Wong</p>
						<p>Duncan Park</p>
					</div>
					<div>
						<h3 className={styles.photos}>Photography Editors</h3>
						<p>Geoffrey Huang</p>
						<p>Ibtida Khurshed</p>
						<p>Honora Muratori</p>

					</div>
					<div>
						<h3 className={styles.art}>Art Directors</h3>
						<p>Jaden Bae</p>
						<p>Stacey Chen</p>
						<p>Rhea Malhotra</p>
						<p>Chuer Zhong</p>
					</div>
					<div>
						<h3 className={styles.layout}>Layout Editors</h3>
						<p>Anjali Bechu**</p>
						<p>Elaine Liu</p>
						<p>Isabel Noh**</p>
						<p>Andre Wang</p>
						<p>Karen Xu</p>
						<p>Jasper Yu-Dawidowicz</p>
					</div>
					<div>
						<h3 className={styles.copy}>Copy Editors</h3>
						<p>Yuna Lee</p>
						<p>Ryan Park</p>
						<p>Niamh Werner</p>
					</div>
					<div>
						<h3 className={styles.biz}>Business Managers</h3>
						<p>Fiona Cai</p>
						<p>Christopher Louie</p>
						<p>Anderson Oh</p>
						<p>Everett Yu-Dawidowicz**</p>
					</div>
					<div>
						<h3 className={styles.web}>Web Editors</h3>
						<p>Adam Choi</p>
						<p>Angela Mashuryan</p>
						<p>Lenny Metlitsky*</p>
						<p>Ankita Saha</p>
					</div>
					<div>
						<h3 className={styles.faculty}>Faculty Advisor</h3>
						<p>Kerry Garfinkel</p>
					</div>
				</section>
			</main>
		</>
	);
};

export default StaffPage;

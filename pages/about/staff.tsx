import Head from "next/head";
import styles from "../../styles/Staff.module.css";

const StaffPage = () => {
	return (
		<>
			<Head>
				<title>Staff | The Spectator</title>
			</Head>
			<main id={styles.main}>
				<h1>Members of the 2022-2023 Spectator Editorial Board</h1>
				<section id={styles.departments}>
					<div>
						<h3>Editors In Cheif</h3>
						<p>Rebecca Bao*</p>
						<p>Phoebe Buckwalter*</p>
					</div>
					<div>
						<h3>News Editors</h3>
						<p>Talia Arcasoy**</p>
						<p>Sarah Diaz</p>
						<p>Seth Fenton**</p>
					</div>
					<div>
						<h3>Features Editors</h3>
						<p>Dalia Levanon</p>
						<p>Suyeon Ryu</p>
						<p>Olivia Woo</p>
					</div>
					<div>
						<h3>Opinions Editors</h3>
						<p>Ivy Huang*</p>
						<p>Gulam Monawarah</p>
					</div>
					<div>
						<h3>Science Editors</h3>
						<p>Hellen Luo</p>
						<p>Jovanna Wu</p>
					</div>
					<div>
						<h3>Arts & Entertainment Editors</h3>
						<p>Lucien Clough</p>
						<p>Simone Raleigh**</p>
						<p>Santino Suarez</p>
					</div>
					<div>
						<h3>Humor Editors</h3>
						<p>Erica Chen</p>
						<p>Finn Charest**</p>
					</div>
					<div>
						<h3>Sports Editors</h3>
						<p>Ava Quarles</p>
						<p>Kaeden Ruparel</p>
						<p>Khush Wadhwa*</p>
					</div>
					<div>
						<h3>Photography Editors</h3>
						<p>Lily Serry</p>
						<p>Sophia Mueller</p>
					</div>
					<div>
						<h3>Art Directors</h3>
						<p>Jaden Bae**</p>
						<p>Fareha Islam</p>
						<p>Nelli Rojas-Cessa</p>
					</div>
					<div>
						<h3>Layout Editors</h3>
						<p>Ankki Dong</p>
						<p>Fiona Huang</p>
						<p>Elaine Liu**</p>
						<p>Jasper Yu-Dawidowicz</p>
					</div>
					<div>
						<h3>Copy Editors</h3>
						<p>Kevin Chang*</p>
						<p>Duncan Park**</p>
						<p>Ryan Park**</p>
						<p>Eman Sadiq</p>
						<p>Allison Zhao</p>
					</div>
					<div>
						<h3>Businesss Managers</h3>
						<p>Amber Shen</p>
						<p>Christopher Louie**</p>
					</div>
					<div>
						<h3>Web Editors</h3>
						<p>Lenny Metlitsky**</p>
						<p>Ankita Saha**</p>
					</div>
					<div>
						<h3>Faculty Advisor</h3>
						<p>Kerry Garfinkel</p>
					</div>
				</section>

				<p className={styles.special_def}>* Managing Board</p>
				<p className={styles.special_def}>* Editors-in-Training</p>
			</main>
		</>
	);
};

export default StaffPage;

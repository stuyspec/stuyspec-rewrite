import { AppInitialProps } from "next/app";
import Head from "next/head";
import styles from "../styles/Dash.module.css";
import { NextPage } from "next";

const Dash = () => {
	return (
		<>
			<Head>
				<title>Dashboard | The Spectator</title>
				<meta
					name="description"
					content="Staff dashboard for The Stuyvesant Spectator"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.container}>
				<h1 id={styles.heading}>User Dashboard</h1>
			</main>
		</>
	);
};

Dash.getInitialProps = async function (ctx: any) {
	console.log("Get initial props");
	return {};
};

export default Dash;

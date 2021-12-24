import Head from "next/head";
import styles from "../styles/404.module.css";
import { useEffect, useState } from "react";

const Fourzerofour = (props: any) => {
	const [location, setLocation] = useState("");

	useEffect(() => setLocation(window.location.pathname), []); // window object is available in useEffect
	return (
		<div>
			<Head>
				<title>Error!</title>
				<meta name="description" content="The Stuyvesant Spectator" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main id={styles.main}>
				<h1>Error!</h1>
				{location ? (
					<h2>{location} doesn&apos;t exist!</h2>
				) : (
					<h2>This page doesn&apos;t exist! </h2>
				)}
			</main>
		</div>
	);
};

export default Fourzerofour;

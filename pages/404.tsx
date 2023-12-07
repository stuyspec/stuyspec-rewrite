import Head from "next/head";
import styles from "../styles/404.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

function Fourzerofour(props: any) {
	const [location, setLocation] = useState("");

	useEffect(() => setLocation(window.location.pathname), []); // window object is available in useEffect
	return (
		<div>
			<Head>
				<title>Error!</title>
			</Head>

			<main id={styles.main}>
				<h1>Error!</h1>
				{location ? (
					<>
						<h2>
							The page <code>{location}</code> cannot be found.
						</h2>
						<Link passHref href="/">
							<div id={styles.button}>Back to Home</div>
						</Link>
					</>
				) : (
					<h2>This page doesn&apos;t exist!</h2>
				)}
			</main>
		</div>
	);
};

export default Fourzerofour;

import Head from "next/head";
import styles from "../styles/Error.module.css";

function Error() {
	return (
		<div>
			<Head>
				<title>Error!</title>
				<meta name="description" content="The Stuyvesant Spectator" />
			</Head>

			<main id={styles.main}>
				<h1>An error occurred. </h1>
			</main>
		</div>
	);
};

export default Error;

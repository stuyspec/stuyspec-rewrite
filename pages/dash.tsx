import Head from "next/head";
import styles from "../styles/Dash.module.css";
import { ReceivedStaff } from "../ts_types/db_types";
import getServerUrl from "../utils/getServerUrl";

export function tokenToAuthHeader(token: string) {
	return {
		authorization: "Bearer: " + token,
	};
}

interface Props {
	user: ReceivedStaff;
}

const Dash = (props: Props) => {
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
				<h2>Hello, {props.user.name}</h2>
			</main>
		</>
	);
};

export default Dash;

export async function getServerSideProps(ctx: any) {
	console.log("here?");
	const token = ctx.req.headers.cookie?.split("token=")[1];
	console.log("Token: ", token);
	if (!token) {
		ctx.res.writeHead(301, { Location: "/" });
		ctx.res.end();
	}

	const request = await fetch(getServerUrl() + "/api/auth/verify", {
		method: "POST",
		headers: tokenToAuthHeader(token),
	});

	const rjson = await request.json();

	if (request.ok) {
		return {
			props: {
				user: rjson.user,
			},
		};
	} else {
		// Error happened
		console.log("Error!");
		console.log(rjson);
	}
}

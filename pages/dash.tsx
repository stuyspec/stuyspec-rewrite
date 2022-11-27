import Head from "next/head";
import Router from "next/router";
import { FormEvent, useState } from "react";
import styles from "../styles/Dash.module.css";
import { defaultProps, ReceivedStaff } from "../ts_types/db_types";
import getServerUrl from "../utils/getServerUrl";

export function tokenToAuthHeader(token: string) {
	return {
		authorization: "Bearer: " + token,
	};
}

interface Props extends defaultProps {
	user: ReceivedStaff;
	token: string;
}

const Dash = (props: Props) => {
	const [passwordOne, setPasswordOne] = useState("");
	const [passwordTwo, setPasswordTwo] = useState("");
	const [description, setDescription] = useState("");
	const [validDescription, setValidDescription] = useState(
		props.user.description
	);

	const handleDescriptionSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (description == "") {
			return;
		}

		const body = { description };
		const request = await fetch("/api/auth/edit_account", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer: " + props.token,
			},
			body: JSON.stringify(body),
		});

		if (request.ok) {
			const rjson = await request.json();
			const new_user = rjson.new as ReceivedStaff;
			if (new_user) {
				setValidDescription(new_user.description);
				setDescription("");
			}
		}
	};
	const handlePasswordSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (
			passwordOne == "" ||
			passwordTwo == "" ||
			passwordOne != passwordTwo
		) {
			return;
		}

		const body = { password: passwordOne };
		const request = await fetch("/api/auth/edit_account", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer: " + props.token,
			},
			body: JSON.stringify(body),
		});

		if (request.ok) {
			const rjson = await request.json();
			console.log(rjson);
			setPasswordOne("");
			setPasswordTwo("");
		}
	};

	const logoutHandler = async () => {
		const request = await fetch("/api/auth/logout", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (request.ok) {
			Router.push("/");
		}
	};

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
				<h2>Current Description: {validDescription}</h2>
				<form onSubmit={handleDescriptionSubmit}>
					<input
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						className={styles.input}
						type="text"
						value={description}
						placeholder="New description..."
						required
					/>
					<br />
					<input
						className={styles.button}
						type="submit"
						value="Edit description"
					/>
				</form>
				{props.user.first_time_login !== false ? (
					<h1 id={styles.change_request}>
						PLEASE CHANGE YOUR PASSWORD AWAY FROM THE CURRENT WEAK
						PASSWORD
					</h1>
				) : (
					<h2>Change your password</h2>
				)}

				<form onSubmit={handlePasswordSubmit}>
					<input
						onChange={(e) => {
							setPasswordOne(e.target.value);
						}}
						className={styles.input}
						type="password"
						value={passwordOne}
						required
						placeholder="Enter a strong and complicated password..."
					/>
					<br />
					<input
						onChange={(e) => {
							setPasswordTwo(e.target.value);
						}}
						className={styles.input}
						type="password"
						value={passwordTwo}
						required
						placeholder="Enter that password again..."
					/>
					<br />
					<input
						className={styles.button}
						type="submit"
						value="Change password"
					/>
				</form>
				<button className={styles.button} onClick={logoutHandler}>
					Logout
				</button>
			</main>
		</>
	);
};

export default Dash;

export async function getServerSideProps(ctx: any) {
	const token = ctx.req.headers.cookie?.split("token=")[1];

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
				token: token,
			},
		};
	} else {
		// Error happened
		console.log("Error!");
		console.log(rjson);
	}
}

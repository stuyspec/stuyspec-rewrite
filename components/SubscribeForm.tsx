import styles from "../styles/Subscribe.module.css";
import { useState } from "react";
import subscribe_button_styles from "../styles/SubscribeButton.module.css";
const SubscribeForm = () => {
	const [email, setEmail] = useState("");
	const [subscribeState, setSubscribeState] = useState("idle");
	const [errorMsg, setErrorMsg] = useState(null);

	const subscribe = async (e: any) => {
		e.preventDefault();
		setSubscribeState("Loading");

		try {
			const r = await fetch("/api/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const rjson = await r.json();
			console.log(rjson);
			if (rjson.message == "success") {
				setSubscribeState("Success");
				setEmail("");
			} else {
				throw new Error(rjson.error.title);
			}
		} catch (e: any) {
			console.error(e);
			setErrorMsg(e.message);
			setSubscribeState("Error");
		}
	};

	return (
		<div className={styles.subscribe_form}>
			<br />
			<input
				required
				name="email"
				type="email"
				id={styles.input}
				placeholder="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<br />
			<button
				disabled={subscribeState === "Loading"}
				type="submit"
				id={subscribe_button_styles.subscribe}
				onClick={subscribe}
			>
				Subscribe
			</button>
			{subscribeState === "Error" && (
				<p id={styles.error}>You did not submit a valid email address</p>
			)}
			{subscribeState === "Success" && (
				<p id={styles.text}>
					Awesome sauce!!! You&apos;ve been subscribed!
				</p>
			)}
		</div>
	);
};

export default SubscribeForm;

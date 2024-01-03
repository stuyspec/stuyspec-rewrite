import styles from "../styles/Subscribe.module.css";
import { useState } from "react";
import subscribe_button_styles from "../styles/SubscribeButton.module.css";

const SubscribeForm = () => {
    const [email, setEmail] = useState("");
    const [subscribeState, setSubscribeState] = useState("idle");
    const [errorMsg, setErrorMsg] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const subscribe = async (e:any) => {
        e.preventDefault();
        setSubscribeState("Loading");
        setShowConfirmation(false); 

        try {
            const r = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const rjson = await r.json();
            console.log(rjson);
            if (rjson.message === "success") {
                setSubscribeState("Success");
                setEmail("");
            } else {
                throw new Error(rjson.error.title);
            }
        } catch (error) {
            console.error(error);
            //setErrorMsg(error.message);
            setSubscribeState("Error");
        }
    };

    const handleSubscribeClick = () => {
        setShowConfirmation(true);
    };

    return (
        <div className={styles.subscribe_form}>
            <br />
            <input
                required
                name="email"
                type="email"
                id={styles.input}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button
                disabled={subscribeState === "Loading"}
                type="submit"
                id={subscribe_button_styles.subscribe}
                onClick={handleSubscribeClick}
            >
                Subscribe
            </button>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className={styles.confirmationModal}>
                    <p>Are you sure you want to subscribe with this email?</p>
                    <button onClick={subscribe}>Yes</button>
                    <button onClick={() => setShowConfirmation(false)}>No</button>
                </div>
            )}

            {subscribeState === "Error" && (
                <p id={styles.error}>You did not submit a valid email address</p>
            )}
            {subscribeState === "Success" && (
                <p id={styles.text}>Awesome sauce!!! You&apos;ve been subscribed!</p>
            )}
        </div>
    );
};

export default SubscribeForm;

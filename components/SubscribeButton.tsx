import Link from "next/link";
import styles from "../styles/SubscribeButton.module.css";

const SubscribeButton = () => {
	return (
		<>
			<Link passHref href="/subscribe">
				<div id={styles.subscribe}>Subscribe</div>
			</Link>
		</>
	);
};

export default SubscribeButton;

import Link from "next/link";
import { useState } from "react";
import styles from "../styles/SubscribeButton.module.css";
import SubscribeModal from "./SubscribeModal";

const SubscribeButton = () => {
	  const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			<div className={styles.subscribe_parent}>
				<button id={styles.subscribe} onClick={() => setIsOpen(true)}>
					Subscribe
				</button>
				{isOpen && <SubscribeModal setIsOpen={setIsOpen} />}
			</div>
		</>
	);
};

export default SubscribeButton;

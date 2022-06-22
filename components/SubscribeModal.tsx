import React from "react";
import styles from "../styles/Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import SubscribeForm from "./SubscribeForm";

const Modal = ({ setIsOpen }: any) => {
	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>
							Newsletter Subscription
						</h5>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.centered}>
						<SubscribeForm />
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;

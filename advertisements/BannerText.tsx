import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Advertisement.module.css";

const BannerText = (props: { text: string; url: string; }) => {

	return (
		<Link
			href={props.url}
		>
			<div className={styles.banner_text_parent}>
				<h1>{props.text}</h1>
			</div>
		</Link>
	);
};

export default BannerText;

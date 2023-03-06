import Image from "next/image";
import Link from "next/link";
import advertisements from "../advertisements";
import styles from "../styles/Advertisement.module.css";

const Advertisment = (props: { index: number }) => {
	let index = props.index % advertisements.length;

	return (
		<Link href={advertisements[index].url}>
			<div id={styles.parent_div}>
				<Image
					id={styles.image}
					src={advertisements[index].image_src}
					fill
					alt={advertisements[index].name + " ad"}
				/>
			</div>
		</Link>
	);
};

export default Advertisment;

import Image from "next/image";
import Link from "next/link";
import horizontalAdvertisements from "../horizontalAdvertisements";
import styles from "../styles/Advertisement.module.css";

const HorizontalAdvertisement = (props: { index: number , section_id: number}) => {
	let index = props.index % horizontalAdvertisements.length;
	let section_id = props.section_id;

	if (section_id != 0 && section_id != 2) {
		return (
			<Link href={horizontalAdvertisements[index].url}>
				<div id={styles.parent_div}>
					<Image
						id={styles.image}
						src={horizontalAdvertisements[index].image_src}
						fill
						alt={horizontalAdvertisements[index].name + " ad"}
					/>
				</div>
			</Link>
		);
	}
};

export default HorizontalAdvertisement;

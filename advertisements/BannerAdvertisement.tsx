import Image from "next/image";
import Link from "next/link";
import banner_advertisements from "./BannerAdvertisements";
import styles from "../styles/Advertisement.module.css";

const BannerAdvertisement = (props: { index: number; show_ad: boolean }) => {
	let index = props.index % banner_advertisements.length;

	return (
		<Link
			href={banner_advertisements[index].url}
			style={{ display: props.show_ad ? "block" : "none" }}
		>
			<div id={styles.parent_div}>
				<Image
					id={styles.image}
					src={banner_advertisements[index].image_src}
					fill
					alt={banner_advertisements[index].name + " ad"}
				/>
			</div>
		</Link>
	);
};

export default BannerAdvertisement;

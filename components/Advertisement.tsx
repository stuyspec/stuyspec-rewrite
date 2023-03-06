import Image from "next/image";
import advertisements from "../advertisements";
import styles from "../styles/Advertisement.module.css";

const Advertisment = () => {
	return (
		<div id="parent_div">
			<Image
				id={styles.image}
				src={advertisements[0].image_src}
				fill
				alt={advertisements[0].name + " ad"}
			/>
		</div>
	);
};

export default Advertisment;

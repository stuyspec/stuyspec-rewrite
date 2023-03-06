import Image from "next/image";
import advertisements from "../advertisements";
import styles from "../styles/Advertisement.module.css";

let index = -1;

const Advertisment = () => {
	if (index != advertisements.length - 1) {
		index++;
	} else {
		index = 0;
	}
	return (
		<div id="parent_div">
			<Image
				id={styles.image}
				src={advertisements[index].image_src}
				fill
				alt={advertisements[index].name + " ad"}
			/>
		</div>
	);
};

export default Advertisment;

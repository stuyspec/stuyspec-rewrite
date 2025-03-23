import Image from "next/image";
import Link from "next/link";
import mixed_advertisements from "./MixedAdvertisements";
import styles from "../styles/Advertisement.module.css";
import { useEffect } from "react";

const MixedAdvertisement = (props: { index: number }) => {
  let index = props.index % mixed_advertisements.length;
  if(mixed_advertisements.length == 0) return -1;
  return (
    mixed_advertisements.length && (
      <Link href={mixed_advertisements[index].url}>
        <div id={styles.parent_div}>
          <Image
            id={styles.image}
            src={mixed_advertisements[index].image_src}
            fill
            alt={mixed_advertisements[index].name + " ad"}
          />
        </div>
      </Link>
    )
  );


};

export default MixedAdvertisement;

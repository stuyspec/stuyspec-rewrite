/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";

const LatestPreviewImage = (props: { imageClass: any; imageIndex: number }) => {
	const [images, setImages] = useState([]);
	const getImages = async () => {
		const res = await fetch("/api/issuu");
		const data = await res.json();
		setImages(data.images);
	};

	useEffect(() => {
		getImages();
	}, []);

	return (
		<Link passHref href="https://issuu.com/stuyspectator">
			<img
				alt={
					"The " +
					["first", "second"][props.imageIndex] +
					" page of the latest Spectator Issue"
				}
				className={props.imageClass}
				src={images[props.imageIndex]}
			/>
		</Link>
	);
};

export default LatestPreviewImage;

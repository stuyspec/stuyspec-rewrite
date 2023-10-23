/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import { IssuuResponse } from "../pages/api/issuu";

const LatestPreviewImage = (props: { imageClass: any; imageIndex: number }) => {
	const [data, setData] = useState<IssuuResponse | undefined>(undefined);
	const getImages = async () => {
		const res = await fetch("/api/issuu");
		const json = await res.json();

		setData(json);
	};

	useEffect(() => {
		getImages();
	}, []);

	return (
		<Link
			passHref
			href={(data && data.link) || "https://issuu.com/stuyspectator"} target="_blank"
		>
			<img
				alt={`The ${
					["first", "last"][props.imageIndex]
				} page of the latest Spectator Issue`}
				className={props.imageClass}
				src={(data && data.images[props.imageIndex]) || ""}
			/>
		</Link>
	);
};

export default LatestPreviewImage;

import type { NextApiRequest, NextApiResponse } from "next";
import { IssuuResponse } from "../../../ts_types/db_types";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IssuuResponse>
) {
	const { method, body } = req;

	if (method == "GET") {
		// removeed for now
		// const images = await getImages();
		res.json({
			images: [
				"https://image.isu.pub/211222040543-c98b7067d4de1b4e47945be020169e9b/jpg/page_1.jpg",
				"https://image.isu.pub/211222040543-c98b7067d4de1b4e47945be020169e9b/jpg/page_32.jpg",
			],
		});
	}
}

async function getImages() {
	const response = await fetch(
		"https://issuu.com/call/profile/v1/documents/stuyspectator?offset=0&limit=25",
		{
			headers: {
				accept: "*/*",
				"accept-language": "en-US,en;q=0.9",
				"content-type": "application/json",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"sec-gpc": "1",
			},
			referrer: "https://issuu.com/stuyspectator",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "include",
		}
	);
	const json = await response.json();
	const uri = json.items[0].uri;
	const getImages = await fetch(
		`https://reader3.isu.pub/stuyspectator/${uri}/reader3_4.json`,
		{
			referrer: "https://e.issuu.com/",
			referrerPolicy: "strict-origin-when-cross-origin",
			body: null,
			method: "GET",
			mode: "cors",
			credentials: "omit",
		}
	);
	const json2 = await getImages.json();
	const pagesLength: number = json2.document.pages.length - 1;
	const images: String[] = [
		json2.document.pages[0].imageUri,
		json2.document.pages[pagesLength].imageUri,
	];
	// add https:// to each image
	for (let i = 0; i < images.length; i++) {
		images[i] = `https://${images[i]}`;
	}
	return images;
}

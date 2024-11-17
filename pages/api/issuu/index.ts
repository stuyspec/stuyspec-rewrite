import type { NextApiRequest, NextApiResponse } from "next";
export interface IssuuResponse {
	images: string[];
	volume: number;
	issue: number;
	title: string;
	link: string;
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<IssuuResponse>
) {
	const { method, body } = req;

	if (method == "GET") {
		const response: IssuuResponse = await getLatestImages();

		return res.json(response);
	}
}

async function getLatestImages() {
	const response = await fetch(
		"https://issuu.com/call/profile/v1/documents/stuyspectator?offset=0&limit=25"
	); // returns latest pdfs (issues) of The Spectator

	const json = await response.json();
	const uriFileName = String(json.items[0].uri).split("/").at(-1); // Get filename of latest issue

	const getImages = await fetch(
		`https://reader3.isu.pub/stuyspectator/${uriFileName}/reader3_4.json`
	); // get the JPG image of every page in the PDF
	const json2 = await getImages.json();

	const numPages: number = json2.document.pages.length;

	let images: string[] = [
		json2.document.pages[0].imageUri, // first page
		json2.document.pages[numPages - 1].imageUri, // last page
	];
	images = images.map((v) => `https://${v}`);

	const postTitle = String(json.items[0].title); // Get issue post's title of latest issue

	let splitTitle = postTitle.split(" "); // Parse the volume and issue from "Volume XX Issue ZZ"
	const volume = Number(splitTitle[1]);
	const issue = Number(splitTitle[3]);

	const link = `https://pdf.stuyspec.com/${volume}/${issue}.pdf`;

	return { images, volume, issue, title: postTitle, link };
}

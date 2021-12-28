import { ObjectId } from "mongodb";
export interface ReceivedArticle {
	_id: ObjectId | string;
	text: string;
	title: string;
	slug: string;
	volume: Number;
	issue: Number;
	section: string;
	summary: string;
	cover_image: string;
	cover_image_contributor: string;
}

export interface IssuuResponse {
	images: String[];
}

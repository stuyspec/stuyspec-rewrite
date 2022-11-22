import { ObjectId } from "mongodb";

export type mongoObjectId = ObjectId | string;
export interface ReceivedArticle {
	_id: mongoObjectId;
	text: string;
	title: string;
	slug: string;
	contributors: ReceivedStaff[];
	volume: number;
	issue: number;
	section_id: number;
	summary: string;
	cover_image: string;
	cover_image_summary: string;
	cover_image_contributor: ReceivedStaff;
	cover_image_source: string;
}

export interface IssuuResponse {
	images: String[];
}

export interface ReceivedStaff {
	_id: ObjectId | string;
	name: string;
	email: string;
	position: string;
	role: string;
	description: string;
	pfp_url: string;
	years: number[];
	slug: string;
}
export type Department =
	| "news"
	| "features"
	| "opinions"
	| "science"
	| "humor"
	| "sports"
	| "ae"
	| "media"
	| "spec-plus";

export const DepartmentsArray = [
	"news",
	"features",
	"opinions",
	"science",
	"humor",
	"sports",
	"ae",
	"media",
	"spec-plus",
];

export const DepartmentsArrayDisplay = [
	"News",
	"Features",
	"Opinions",
	"Science",
	"Humor",
	"Sports",
	"Arts and Entertainment",
	"Media",
	"Spec+",
];

import { ObjectId } from "mongodb";
export interface ReceivedArticle {
	_id: ObjectId | string;
	text: string;
	title: string;
  slug: string;
  contributors: string[];
	volume: number;
	issue: number;
  section_id: number;
  department: string;
  subdepartment: string;
	summary: string;
  cover_image: string;
  cover_image_summary: string;
  cover_image_contributor: string;
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
}
export type Department =
	| "news"
	| "features"
	| "opinions"
	| "science"
	| "humor"
	| "sports"
	| "artsandentertainment"
	| "media"
	| "spec+";
export const DepartmentsArray = [
	"news",
	"features",
	"opinions",
	"science",
	"humor",
	"sports",
	"artsandentertainment",
	"media",
	"spec+",
];

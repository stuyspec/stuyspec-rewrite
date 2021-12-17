import { ObjectId } from "mongodb";
export interface RecievedArticle {
	_id: ObjectId | string;
	text: string;
	title: string;
}

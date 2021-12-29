import { ObjectId } from "mongodb";
export interface ReceivedArticle {
  _id: ObjectId | string;
  text: string;
  title: string;
  slug: string;
  volume: number;
  issue: number;
  section_id: number;
  summary: string;
  cover_image: string;
  cover_image_contributor: string;
  contributors: string[];
}

export interface IssuuResponse {
  images: String[];
}

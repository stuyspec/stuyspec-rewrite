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

export interface RecievedStaff {
  _id: ObjectId | string;
  id: number;
  provider: string;
  uid: string;
  first_name: string;
  image: string;
  email: string;
  thumbnail: string;
  last_name: string;
  slug: string;
  description: string;
  security_level: number;
  profile_picture_file_name: string;
  profile_picture_content_type: string;
  profile_picture_file_size: string;
  profile_picture_updated_at: string;
}

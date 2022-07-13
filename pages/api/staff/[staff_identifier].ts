import type { NextApiRequest, NextApiResponse } from "next";
import { ReceivedStaff } from "../../../ts_types/db_types";
import { get_staff_by_id, get_staff_by_slug } from "../../../db";

type ResponseStructure = {
	member: ReceivedStaff;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	const { method, query } = req;

	if (method == "GET") {
		let identifier: string = String(query.staff_identifier);
		let member: ReceivedStaff;
		if (query.identifier_type == "id") {
			member = await get_staff_by_id(identifier);
		} else {
			member = await get_staff_by_slug(identifier);
		}

		res.json({ member: JSON.parse(JSON.stringify(member)) });
	} else {
		res.status(400);
	}
}

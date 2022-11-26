import type { NextApiRequest, NextApiResponse } from "next";
import { get_staff_by_query } from "../../../db";
import jwt from "jsonwebtoken";
import { ReceivedStaff } from "../../../ts_types/db_types";

type ResponseStructure = {
	message: string;
	user?: ReceivedStaff;
	token?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	const { method, query, body } = req;

	if (method == "POST" || method == "GET") {
		if (!process.env.JWT_PRIVATE_KEY) {
			res.statusCode = 501;
			res.json({
				message:
					"PRIVATE KEY FOR JSONWEBTOKEN NOT SPECIFIED IN SERVER ENV",
			});
		}
		const JWT_PRIVATE_KEY = String(process.env.JWT_PRIVATE_KEY);

		const email = body.email;
		const attempted_staff = await get_staff_by_query({ email });

		if (!attempted_staff) {
			res.statusCode = 404;
			res.json({ message: `Staff with email of ${email} not found` });
		}

		// TODO: Add password authentication
		const user = attempted_staff;

		const token = jwt.sign(
			{
				user: user,
			},
			JWT_PRIVATE_KEY,
			{ expiresIn: "1w" }
		);

		res.json({
			message: "Successfully logged in this user: ",
			user: user,
			token: token,
		});
	} else {
		res.status(400);
	}
}

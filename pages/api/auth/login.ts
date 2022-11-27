import type { NextApiRequest, NextApiResponse } from "next";
import { ThrownError } from "../../../ts_types/api_types";
import { ReceivedStaff } from "../../../ts_types/db_types";
import { login } from "../../../utils/authHelper";

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
		const email = body.email;

		try {
			const { user, token } = await login(email);

			res.json({
				message: "Successfully logged in this user: ",
				user: user,
				token: token,
			});
		} catch (e: any) {
			e = e as ThrownError;
			res.statusCode = e.statusCode || 500;
			res.json({
				message: e.message,
			});
		}
	} else {
		res.status(400);
	}
}

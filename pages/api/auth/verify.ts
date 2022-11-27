import type { NextApiRequest, NextApiResponse } from "next";
import { ThrownError } from "../../../ts_types/api_types";
import { ReceivedStaff } from "../../../ts_types/db_types";
import { verify } from "../../../utils/authHelper";

type ResponseStructure = {
	message: string;
	user?: ReceivedStaff;
	token?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	const { method } = req;

	if (method == "POST" || method == "GET") {
		const authValue = req.headers.authorization;

		try {
			// validate the JWT specified in the "Bearer: <JWT>" authorization header
			const user = await verify(authValue);

			res.json({
				message: "Successfully verified this user",
				user: user,
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

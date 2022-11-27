import type { NextApiRequest, NextApiResponse } from "next";
import { ThrownError } from "../../../ts_types/api_types";

type ResponseStructure = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	const { method } = req;

	if (method == "POST") {
		try {
			res.setHeader(
				"Set-Cookie",
				"token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
			);
			res.send({ message: "Logged out." });
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

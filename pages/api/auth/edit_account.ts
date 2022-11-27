import type { NextApiRequest, NextApiResponse } from "next";
import { update_staff_by_query } from "../../../db";
import { ThrownError } from "../../../ts_types/api_types";
import { ReceivedStaff } from "../../../ts_types/db_types";
import { verify } from "../../../utils/authHelper";
import bcrypt from "bcryptjs";

type ResponseStructure = {
	message: string;
	new?: ReceivedStaff;
	token?: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseStructure>
) {
	const { method, body } = req;

	if (method == "PUT") {
		const authValue = req.headers.authorization;
		try {
			// validate the JWT specified in the "Bearer: <JWT>" authorization header
			const user = await verify(authValue);

			const allowed_fields_to_update = ["description", "password"];
			const keys = Object.keys(body);
			const valid_keys_to_update = keys.every((v) =>
				allowed_fields_to_update.includes(v)
			);

			if (!valid_keys_to_update) {
				const e = new ThrownError(
					`Some keys that are not in the set of ${JSON.stringify(
						allowed_fields_to_update
					)} to update have been specified`
				);
				e.statusCode = 400;
				throw e;
			}

			if (body.password) {
				const password = body.password;
				// User is updating password
				const salt = await bcrypt.genSalt(14);
				// Use 14 rounds instead of 10 because hardware is faster now and can do more in 1-2 seconds of acceptable wait
				const hashedPassword = await bcrypt.hash(password, salt);
				body.password = hashedPassword;
			}

			const new_staff = await update_staff_by_query(
				String(user._id),
				body
			);

			res.json({
				message: "Successfully verified this user, user is edited",
				new: new_staff,
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

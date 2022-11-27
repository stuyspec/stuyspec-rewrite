import { get_staff_by_query } from "../db";
import jwt from "jsonwebtoken";
import { ReceivedStaff } from "../ts_types/db_types";
import { ThrownError } from "../ts_types/api_types";

export async function login(email: string) {
	if (!process.env.JWT_PRIVATE_KEY) {
		const e = new ThrownError(
			"PRIVATE KEY FOR JSONWEBTOKEN NOT SPECIFIED IN SERVER ENV"
		);
		e.statusCode = 501;
		throw e;
	}
	const JWT_PRIVATE_KEY = String(process.env.JWT_PRIVATE_KEY);

	if (!email) {
		const e = new ThrownError("Staff email not specified in request body");
		e.statusCode = 404;
		throw e;
	}

	const attempted_staff = (await get_staff_by_query({
		email,
	})) as ReceivedStaff;

	if (!attempted_staff) {
		const e = new ThrownError(`Staff with email of ${email} not found`);
		e.statusCode = 404;
		throw e;
	}

	const user = attempted_staff;

	// TODO: Add password authentication

	const token = jwt.sign(
		{
			user: user,
		},
		JWT_PRIVATE_KEY,
		{ expiresIn: "1w" }
	);

	return { user, token };
}

import { get_staff_by_id, get_staff_by_query } from "../db";
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
		const e = new ThrownError("Staff email not specified");
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

export async function verify(authValue: string | undefined) {
	if (!process.env.JWT_PRIVATE_KEY) {
		const e = new ThrownError(
			"PRIVATE KEY FOR JSONWEBTOKEN NOT SPECIFIED IN SERVER ENV"
		);
		e.statusCode = 501;
		throw e;
	}
	const JWT_PRIVATE_KEY = String(process.env.JWT_PRIVATE_KEY);

	if (!authValue) {
		const e = new ThrownError("Authorization header not specified");
		e.statusCode = 404;
		throw e;
	}

	const body_token = authValue.replaceAll(/Bearer: /g, "");
	const decoded: any = jwt.verify(body_token, JWT_PRIVATE_KEY);

	if (decoded) {
		const jwt_user: ReceivedStaff = decoded.user;
		const attempted_staff = (await get_staff_by_id(
			String(jwt_user._id)
		)) as ReceivedStaff;

		if (!attempted_staff) {
			const e = new ThrownError(
				"Staff member with the jsonwebtoken's user value _id could not be found "
			);
			e.statusCode = 404;
			throw e;
		}

		return attempted_staff;
	} else {
		const e = new ThrownError("JSONWEBTOKEN could not be decoded");
		e.statusCode = 400;
		throw e;
	}
}

export function cookieToAuthHeader(ctx: any) {
	return {
		headers: {
			authorization:
				"Bearer " + ctx.req.headers.cookie.replace("token=", ""),
		},
	};
}

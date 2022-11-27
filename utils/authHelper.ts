import {
	get_staff_by_id,
	UNSAFE_get_staff_by_query,
	update_staff_by_query,
} from "../db";
import jwt from "jsonwebtoken";
import { ReceivedStaff } from "../ts_types/db_types";
import { ThrownError } from "../ts_types/api_types";
import bcrypt from "bcryptjs";

export async function login(email: string, password: string) {
	if (!process.env.JWT_PRIVATE_KEY) {
		const e = new ThrownError(
			"PRIVATE KEY FOR JSONWEBTOKEN NOT SPECIFIED IN SERVER ENV"
		);
		e.statusCode = 501;
		throw e;
	}
	const JWT_PRIVATE_KEY = String(process.env.JWT_PRIVATE_KEY);

	if (!email) {
		const e = new ThrownError("Staff account email not specified");
		e.statusCode = 404;
		throw e;
	}
	if (!password) {
		const e = new ThrownError("Staff account password not specified");
		e.statusCode = 400;
		throw e;
	}

	let UNSAFE_attempted_staff = await UNSAFE_get_staff_by_query({
		email,
	});

	if (!UNSAFE_attempted_staff) {
		const e = new ThrownError(`Staff with email of ${email} not found`);
		e.statusCode = 404;
		throw e;
	}

	if (
		UNSAFE_attempted_staff.first_time_login !== false // true or undefined count are valid
	) {
		if (password != UNSAFE_attempted_staff.name) {
			// For first time login after migration, allow to login with first name and change password
			const e = new ThrownError(`First time login password is incorrect`);
			e.statusCode = 400;
			throw e;
		}
	} else {
		// Password authentication
		const isPasswordCorrect = await bcrypt.compare(
			password,
			UNSAFE_attempted_staff.password
		);

		if (!isPasswordCorrect) {
			const e = new ThrownError(`Password is incorrect`);
			e.statusCode = 400;
			throw e;
		}
	}

	const user = UNSAFE_attempted_staff as any;
	delete user.password; // do not return password hash

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

	// use regex instead of replaceAll, so it is compatible with nodejs versions < 15
	const body_token = String(authValue).replace(/Bearer: /g, "");

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

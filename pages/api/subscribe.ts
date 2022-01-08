import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const { email } = req.body;
	if (!email || !email.length) {
		return res.status(400).json({
			error: { title: "Email is required" },
		});
	}

	const API_KEY = process.env.MAILCHIMP_API_KEY;
	const API_SERVER = process.env.MAILCHIMP_API_SERVER;
	const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;

	const url = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
	const body = {
		email_address: email,
		status: "subscribed",
	};

	try {
		const r = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `api_key ${API_KEY}`,
			},
			body: JSON.stringify(body),
		});

		const data: any = await r.json();
		if (data.status == "subscribed") {
			return res.status(201).json({ message: "success", response: data });
		} else {
			return res.status(500).json({
				message: "failure",
				error: { title: data.title },
			});
		}
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: { title: error.message } });
	}
}

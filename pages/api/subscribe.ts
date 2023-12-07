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

	const API_KEY = process.env.MAILERLITE_API_TOKEN;

	const url = `https://connect.mailerlite.com/api/subscribers`;
	const body = {
		email,
	};

	try {
		const r = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${API_KEY}`,
			},
			body: JSON.stringify(body),
		});

		const data: any = await r.json();
		if (data?.data?.status == "active") {
			return res.status(201).json({ message: "success" });
		} else {
			return res.status(500).json({
				message: "failure",
				error: { title: data.message },
			});
		}
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ error: { title: error.message } });
	}
}

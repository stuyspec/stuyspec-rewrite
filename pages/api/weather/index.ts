import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;
  if (method == "GET") {
    // fetch ip address
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(ip);
    // const weather = await fetch(
    // 	"https://api.openweathermap.org/data/2.5/weather?q="
    // );
    // const weatherData = await weather.json();
    res.status(200).json({});
  }
}

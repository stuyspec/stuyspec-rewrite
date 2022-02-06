import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, body } = req;

  // let position: Array<number> = []

  // function success(position: any) {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;

  //   position = [
  //     latitude,
  //     longitude
  //   ];
  // }

  if (method == "GET") {
    // fetch ip address
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(ip);
    // const weather = await fetch(
    // 	"https://api.openweathermap.org/data/2.5/weather?q="
    // );
    // const weatherData = await weather.json();

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((geoPosition: GeolocationPosition) => {
    //     const position = {
    //       latitude: geoPosition.coords.latitude,
    //       longitude: geoPosition.coords.longitude
    //     }
    //   })
    // }

    // if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
    //   window.navigator.geolocation.getCurrentPosition(success);
    // }

    // const latitude = 0;
    // const longitude = 1;

    // console.log(position[latitude] + ", " + position[longitude]);

    // const url = `api.openweathermap.org/data/2.5/weather?lat=40.7178&lon=74.0138&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`;

    // const weather = await fetch(
    //   url
    // );
    // const weatherData = await weather.json();
    // res.json({ member: JSON.parse(JSON.stringify(weatherData)) });
    res.status(200).json({});
  }
}

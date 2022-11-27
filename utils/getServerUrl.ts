function getServerUrl() {
	const dev = process.env.NODE_ENV !== "production";
	return dev
		? "http://localhost:3000"
		: "https://" + process.env.NEXT_PUBLIC_VERCEL_URL;
}
export default getServerUrl;

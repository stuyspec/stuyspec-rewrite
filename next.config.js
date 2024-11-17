/** @type {import('next').NextConfig} */

const securityHeaders = [
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
];

module.exports = {
	i18n: {
		locales: ["en"],
		defaultLocale: "en",
	},
	reactStrictMode: true,
	images: {
		domains: [
			"stuyspec-images.s3.amazonaws.com",
			"stuyspec-media.s3.amazonaws.com",
			"image.isu.pub",
			"cdn.discordapp.com",
		],
		unoptimized: true,
	},
	async headers() {
		return [
			{
				// Apply these headers to all routes in your application.
				source: "/(.*)",
				headers: securityHeaders,
			},
			{
				source: "/dash",
				headers: [
					{
						key: "Cache-Control",
						value: "no-store",
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/apply/web",
				destination: "https://docs.google.com/forms/d/e/1FAIpQLSdJw8R4-bw5xjWG9P3Ld1WY4ZEg_L3cyhFzYJgB_a7SJtJAsA/viewform?usp=sf_link",
				destination: "https://forms.gle/APPgTmcS2Zom6z1y7",
				permanent: true,
			},
			{
				source: "/department/ae/sing",
				destination: "/department/ae/sing!",
				permanent: true
			},
		];
	},
	async rewrites() {
		return {
			fallback: [
				{
					// Redirect old site links with one subdeps to article link
					source: "/:department/:slug",
					destination: `/article/:slug`,
				},
				{
					// Redirect old site links with two subdeps to article link
					source: "/:department/:sub_section/:slug",
					destination: `/article/:slug`,
				},
			],
		};
	},
};

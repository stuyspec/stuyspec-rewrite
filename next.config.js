/** @type {import('next').NextConfig} */

const securityHeaders = [
	{
		key: "X-DNS-Prefetch-Control",
		value: "on",
	},
];

module.exports = {
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
				destination: "mailto:web@stuyspec.com",
				permanent: true,
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

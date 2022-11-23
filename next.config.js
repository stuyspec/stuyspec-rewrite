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
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

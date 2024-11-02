/** @type {import('next').NextConfig} */
const nextConfig = {
	// Configure `pageExtensions` to include MDX files
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	// Optionally, add any other Next.js config below
	output: 'standalone',
	experimental: {
		serverActions: {
			allowedOrigins: [
				'scout.yetirobotics.org',
				'scouting.svc.int.yukigamine.net',
				'localhost:3000'
			]
		}
	}
};

module.exports = nextConfig;

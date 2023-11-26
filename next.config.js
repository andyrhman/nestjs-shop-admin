/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        siteDescription: "Admin site for managing shopyfy",
        siteKeywords: "Admin",
        siteUrl: "http://localhost:3000",
        siteTitle: "Admin Shopyfy"
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            }
        ]
    }
};

module.exports = nextConfig

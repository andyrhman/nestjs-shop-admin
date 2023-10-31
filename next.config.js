/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        siteDescription: "Admin site for managing shopyfy",
        siteKeywords: "Admin",
        siteUrl: "http://localhost:3000",
        siteTitle: "Admin Shopyfy"
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.tailwindui.com'
            },
            {
                protocol: 'https',
                hostname: '**.placeholder.com'
            },
            {
                protocol: 'https',
                hostname: '**.gstatic.com'
            },
            {
                protocol: 'https',
                hostname: '**.loremflickr.com'
            },
        ]
    }
};

module.exports = nextConfig

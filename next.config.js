/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production"

const nextConfig = {
    output: "export", // enables static export
    images: {
        unoptimized: true, // avoids Next.js image optimization issues on GH Pages
    },
    basePath: isProd ? "/aeronyxtech-site" : "",
    assetPrefix: isProd ? "/aeronyxtech-site/" : "",
}

module.exports = nextConfig
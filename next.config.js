/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    output: "export",          // Required for static export
    images: { unoptimized: true }, // Disable Next.js image optimizer
    basePath: isProd ? "" : "",    // Root-level since using custom domain
    assetPrefix: isProd ? "/" : "",
};

module.exports = nextConfig;
/**
 * next-sitemap configuration for aeronyxtech.com
 *
 * Notes:
 * - We intentionally list only hub pages in additionalSitemaps that actually exist under public/sitemaps.
 * - transform() sets higher priority for /job-board which is updated frequently and should be more visible.
 * - lastmod is generated at build time in ISO format per the sitemap spec.
 */
/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://aeronyxtech.com',
    generateRobotsTxt: true,
    sitemapBaseFileName: 'sitemap',
    outDir: 'public',
    // Default fallbacks if transform is not used for a URL
    changefreq: 'daily',
    priority: 0.7,
    // Customize each emitted URL entry
    transform: async (config, url) => {
        return {
            loc: url,
            changefreq: 'daily', // Most pages change relatively often
            priority: url.startsWith('/job-board') ? 0.9 : 0.7, // Boost job board visibility
            lastmod: new Date().toISOString(), // ISO 8601 timestamp
        };
    },
    // Keep this list in sync with public/sitemap-index.xml and files under public/sitemaps
    additionalSitemaps: [
        'https://aeronyxtech.com/sitemaps/sitemap-jobs.xml',
        'https://aeronyxtech.com/sitemaps/sitemap-companies.xml',
        'https://aeronyxtech.com/sitemaps/sitemap-interview-questions.xml',
        'https://aeronyxtech.com/sitemaps/sitemap-guides.xml'
    ],
};
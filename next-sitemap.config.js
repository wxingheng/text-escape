/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://yoursite.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://yoursite.com/server-sitemap.xml',
    ],
  },
} 
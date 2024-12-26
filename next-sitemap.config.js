/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://your-domain.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalSitemaps: [
    'https://your-domain.com/baidusitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      // 百度爬虫特殊规则
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 1,
      }
    ],
    additionalSitemaps: [
      'https://your-domain.com/sitemap.xml',
      'https://your-domain.com/baidusitemap.xml',
    ],
  },
} 
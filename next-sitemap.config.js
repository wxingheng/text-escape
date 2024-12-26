/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://text-escape.jcommon.top',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  additionalSitemaps: [
    'https://text-escape.jcommon.top/baidusitemap.xml',
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
      'https://text-escape.jcommon.top/sitemap.xml',
      'https://text-escape.jcommon.top/baidusitemap.xml',
    ],
  },
} 
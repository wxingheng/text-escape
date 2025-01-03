/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://text-escape.jcommon.top',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 1.0,
  sitemapSize: 7000,
  
  transform: async (config, path) => {
    // 根据路径自定义优先级
    const priority = path === '/' ? 1.0 : 0.8
    const changefreq = path === '/' ? 'daily' : 'weekly'
    
    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
  
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      // 针对百度爬虫的特殊规则
      {
        userAgent: 'Baiduspider',
        allow: '/',
        crawlDelay: 1,
      }
    ],
  },
} 
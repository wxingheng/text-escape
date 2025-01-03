import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '您的网站标题 | 核心关键词',
  description: '详细的网站描述，包含重要关键词，建议150-160字符',
  keywords: '关键词1, 关键词2, 关键词3',
  authors: [{ name: '您的名字', url: 'https://your-website.com' }],
  creator: '您的名字',
  publisher: '您的组织名称',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  openGraph: {
    title: '您的网站标题',
    description: '网站描述',
    url: 'https://text-escape.jcommon.top',
    siteName: '网站名称',
    images: [
      {
        url: 'https://你的域名/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '网站预览图片描述'
      }
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '您的网站标题',
    description: '网站描述',
    images: ['https://你的域名/og-image.jpg'],
  },
  verification: {
    google: '您的 Google Search Console 验证码',
    baidu: '您的百度站长验证码',
  }
} 
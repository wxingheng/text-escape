import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '文本转义工具 - 在线文本转义工具',
    default: '文本转义工具 - 在线文本转义工具',
  },
  description: '一个简单易用的在线文本转义工具，支持换行符和双引号的转义与反转义',
  keywords: [
    '文本转义', '文本转义工具', '在线文本转义工具', 
    '字符串转义', 'JSON转义', '换行符转义',
    '在线工具', '开发者工具', '编程工具'
  ],
  authors: [{ name: 'jcommon' }],
  creator: 'jcommon',
  publisher: 'jcommon',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
    title: '文本转义工具 - 在线文本转义工具',
    description: '一个简单易用的在线文本转义工具，支持换行符和双引号的转义与反转义',
    url: 'https://text-escape.jcommon.top',
    siteName: '文本转义工具 - 在线文本转义工具',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'zh_CN',
    type: 'website',
    // article: {
    //   publishedTime: new Date().toISOString(),
    //   modifiedTime: new Date().toISOString(),
    //   section: '开发工具',
    //   tags: ['文本转义', '开发工具', '在线工具']
    // }
  },
  twitter: {
    card: 'summary_large_image',
    title: '文本转义工具 - 在线文本转义工具',
    description: '一个简单易用的在线文本转义工具，支持换行符和双引号的转义与反转义',
    images: ['https://text-escape.jcommon.top/og-image.png'],
  },
  verification: {
    google: '您的 Google Search Console 验证码',
    // baidu: '您的百度站长验证码',
    // bing: '您的 Bing Webmaster 验证码',
    yandex: '您的 Yandex 验证码'
  },
  alternates: {
    canonical: 'https://text-escape.jcommon.top',
    languages: {
      'zh-CN': 'https://text-escape.jcommon.top',
      'en-US': 'https://text-escape.jcommon.top/en'
    }
  }
} 
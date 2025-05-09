import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GitHubLink from './components/GitHubLink';
import VisitorStats from './components/VisitorStats';
import Navigation from './components/Navigation';
import FriendLinks from './components/FriendLinks';
import JsonLd from './components/JsonLd';
import PerformanceMonitor from './components/PerformanceMonitor';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "文本转义工具 - 在线文本转义/反转义工具",
    template: "%s | 文本转义工具"
  },
  description: "文本转义工具是一款免费的在线文本转义/反转义工具，支持换行符(\\n)和双引号(\")的转义与反转义，提供实时预览和一键复制功能。适用于JSON字符串、配置文件等场景的文本处理。完全免费，无需下载安装。",
  keywords: [
    "文本转义工具", "在线转义工具", "字符串转义", "JSON转义", 
    "文本换行", "文本换行解析", "转义工具", "反转义", 
    "换行符转义", "双引号转义", "html 换行转换", 
    "postman格式转换", "在线工具", "开发者工具", "编程工具"
  ],
  authors: [{ name: "jcommon", url: "https://github.com/wxingheng" }],
  creator: "jcommon",
  publisher: "jcommon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "文本转义工具 - 在线文本转义/反转义",
    description: "一个简单易用的在线文本转义工具，支持换行符和双引号的转义与反转义，提供实时预览和一键复制功能。",
    url: "https://text-escape.jcommon.top",
    siteName: "文本转义工具",
    locale: "zh_CN",
    type: "website",
    images: [
      {
        url: "https://text-escape.jcommon.top/api/og",
        width: 1200,
        height: 630,
        alt: "文本转义工具预览图"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "文本转义工具 - 在线文本转义/反转义",
    description: "一个简单易用的在线文本转义工具，支持换行符和双引号的转义与反转义，提供实时预览和一键复制功能。",
    images: ["https://text-escape.jcommon.top/api/og"],
    creator: "@jcommon"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
//   1. Google验证码：
// 访问 Google Search Console
// 添加网站属性时，选择"URL 前缀"或"域"验证方式
// 会得到一个类似 google-site-verification: xxxxxxxxxxxxxxxxxxxxx 的代码
// 只需填写 xxxxxxxxxxxxxxxxxxxxx 这部分
// 百度验证码：
// 访问百度站长平台
// 添加网站后，选择"HTML标签验证"
// 会得到一个类似 <meta name="baidu-site-verification" content="xxxxxxxxxxxxxx"/> 的代码
// 只需填写 xxxxxxxxxxxxxx 这部分
  verification: {
    google: "72ujeyKSiINNgDo4R4cLJC90hi_BVYEaA0dDjKqAjuc",
    other: {
      'baidu-site-verification': "codeva-H5NHS0Mwy9",
    },
  },
  alternates: {
    canonical: "https://text-escape.jcommon.top",
    languages: {
      'zh-CN': 'https://text-escape.jcommon.top',
      'en-US': 'https://text-escape.jcommon.top/en'
    }
  },
  other: {
    'mobile-agent': 'format=html5;url=https://text-escape.jcommon.top',
    'github-repo': 'https://github.com/wxingheng/text-escape',
    'application-name': '文本转义工具',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': '文本转义工具',
    'theme-color': '#ffffff',
    'msapplication-TileColor': '#ffffff',
    'msapplication-config': '/browserconfig.xml'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            var _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?fde766d8f0ffe2b33ce6b4519b20d326";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
          `
        }} />
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <PerformanceMonitor />
        <GitHubLink />
        <Navigation />
        {children}
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4 py-8 border-t border-gray-200 dark:border-gray-700">
            <FriendLinks />
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <a 
                href="https://beian.miit.gov.cn/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                鄂ICP备2022018193号-3
              </a>
              {/* <span>|</span>
              <VisitorStats /> */}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
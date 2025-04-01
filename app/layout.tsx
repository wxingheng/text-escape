import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GitHubLink from './components/GitHubLink';
import VisitorStats from './components/VisitorStats';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "文本转义工具 - 在线文本转义/反转义工具",
  description: "文本转义工具是一款免费的在线文本转义/反转义工具，支持换行符(\\n)和双引号(\")的转义与反转义，提供实时预览和一键复制功能。适用于JSON字符串、配置文件等场景的文本处理。完全免费，无需下载安装。",
  keywords: ["文本转义工具", "在线转义工具", "字符串转义", "JSON转义", "文本换行", "文本换行解析", "转义工具", "反转义", "换行符转义", "双引号转义", "html 换行转换", "postman格式转换"],
  authors: [{ name: "jcommon" }],
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
  },
  other: {
    'mobile-agent': 'format=html5;url=https://text-escape.jcommon.top',
    'github-repo': 'https://github.com/wxingheng/text-escape'
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
        <script dangerouslySetInnerHTML={{
          __html: `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?YOUR_BAIDU_TONGJI_ID";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
          `
        }} />
        <script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <GitHubLink />
        {children}
        <VisitorStats />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  keywords: ["文本转义工具", "在线转义工具", "字符串转义", "JSON转义", "免费工具", "在线工具", "文本处理", "转义工具", "反转义", "换行符转义", "双引号转义"],
  authors: [{ name: "jcommon" }],
  creator: "jcommon",
  publisher: "jcommon",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "文本���义工具 - 在线文本转义/反转义",
    description: "一个简单易用的在线文本转义工具，支持换行符和双引号的转义与反转义，提供实时预览和一键复制功能。",
    url: "https://your-domain.com",
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
  verification: {
    google: "your-google-site-verification",
    baidu: "your-baidu-site-verification",
  },
  alternates: {
    canonical: "https://your-domain.com",
  },
  other: {
    'mobile-agent': 'format=html5;url=https://your-domain.com'
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

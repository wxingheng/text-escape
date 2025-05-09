'use client';

import { usePathname } from 'next/navigation';

export default function JsonLd() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '文本转义工具',
    description: '一个简单易用的在线文本转义工具，支持换行符和双引号的转义与反转义，提供实时预览和一键复制功能。',
    url: 'https://text-escape.jcommon.top',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CNY'
    },
    author: {
      '@type': 'Person',
      name: 'jcommon',
      url: 'https://github.com/wxingheng'
    },
    publisher: {
      '@type': 'Organization',
      name: 'jcommon',
      url: 'https://github.com/wxingheng'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://text-escape.jcommon.top'
    },
    potentialAction: {
      '@type': 'UseAction',
      target: 'https://text-escape.jcommon.top'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
} 
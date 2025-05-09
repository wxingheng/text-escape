'use client';

import Link from 'next/link';

const tools = [
  {
    name: 'JSON 格式化工具',
    description: '在线 JSON 格式化、压缩、验证工具',
    url: 'https://json.jcommon.top',
    icon: '📝'
  },
  {
    name: 'Markdown 转图片',
    description: '将 Markdown 文档转换为图片',
    url: 'https://md2img.jcommon.top',
    icon: '🖼️'
  },
  {
    name: '视频格式转换',
    description: '在线视频格式转换工具',
    url: '/video',
    icon: '🎥'
  }
];

export default function RelatedTools() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">相关工具</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.url}
            href={tool.url}
            className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{tool.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tool.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
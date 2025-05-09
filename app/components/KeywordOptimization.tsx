'use client';

const keywords = [
  {
    category: '文本处理',
    terms: [
      '文本转义', '字符串转义', '文本反转义', '字符串反转义',
      '换行符转义', '双引号转义', '特殊字符转义', 'HTML转义'
    ]
  },
  {
    category: 'JSON相关',
    terms: [
      'JSON转义', 'JSON字符串', 'JSON格式化', 'JSON压缩',
      'JSON验证', 'JSON解析', 'JSON美化', 'JSON在线工具'
    ]
  },
  {
    category: '开发工具',
    terms: [
      '在线工具', '开发者工具', '编程工具', '代码工具',
      '文本工具', '字符串工具', '格式转换', '在线转换'
    ]
  }
];

export default function KeywordOptimization() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">相关关键词</h2>
      <div className="space-y-6">
        {keywords.map((group) => (
          <div key={group.category}>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.terms.map((term) => (
                <span
                  key={term}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm"
                >
                  {term}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
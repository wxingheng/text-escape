'use client';

import { useState } from 'react';
import { fetchToCurl } from '../utils/fetchToCurl';

export default function FetchToCurl() {
  const [fetchCode, setFetchCode] = useState('');
  const [curlCommand, setCurlCommand] = useState('');
  const [error, setError] = useState('');

  const convertToCurl = () => {
    try {
      // 清除之前的错误
      setError('');

      // 提取 fetch 参数
      const matches = fetchCode.match(/fetch\(['"]([^'"]+)['"](?:,\s*({[\s\S]+?}))?\)/);
      if (!matches) {
        throw new Error('无效的 fetch 代码格式');
      }

      const [, url, optionsStr] = matches;
      let options = {};
      
      if (optionsStr) {
        // 使用 Function 构造器安全地解析 options 对象
        options = new Function(`return ${optionsStr}`)();
      }

      const curlStr = fetchToCurl({ url, ...options });
      setCurlCommand(curlStr);
    } catch (err) {
      setError(err instanceof Error ? err.message : '转换失败');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      alert('已复制到剪贴板');
    } catch (err) {
      alert('复制失败');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          输入 fetch 代码：
        </label>
        <textarea
          className="w-full h-32 p-2 border rounded-md font-mono text-sm"
          value={fetchCode}
          onChange={(e) => setFetchCode(e.target.value)}
          placeholder={`fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})`}
        />
      </div>

      <div className="flex space-x-4">
        <button
          onClick={convertToCurl}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          转换为 curl
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-sm">
          错误：{error}
        </div>
      )}

      {curlCommand && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              curl 命令：
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              复制
            </button>
          </div>
          <pre className="w-full p-2 bg-gray-100 rounded-md overflow-x-auto font-mono text-sm">
            {curlCommand}
          </pre>
        </div>
      )}
    </div>
  );
} 
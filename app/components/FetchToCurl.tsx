'use client';

import { useState } from 'react';
import { fetchToCurl } from '../utils/fetchToCurl';

interface FetchToCurlProps {
  demoText?: string;
}

export default function FetchToCurl({ demoText }: FetchToCurlProps) {
  const [fetchCode, setFetchCode] = useState('');
  const [curlCommand, setCurlCommand] = useState('');
  const [error, setError] = useState('');

  // 格式化代码的辅助函数
  const formatCode = (code: string) => {
    return code.split('\n')
      .map(line => line.trim())
      .filter(line => line)  // 移除空行
      .join('');  // 合并为单行
  };

  const handleDemo = () => {
    if (demoText) {
      setFetchCode(demoText);
      // 自动转换 demo 文本
      handleConvert(demoText);
    }
  };

  const handleConvert = (code: string = fetchCode) => {
    try {
      setError('');
      const formattedCode = formatCode(code);
      const matches = formattedCode.match(/fetch\(['"]([^'"]+)['"],\s*({.+})\)/);
      if (!matches) {
        throw new Error('无效的 fetch 代码格式');
      }

      const [, url, optionsStr] = matches;
      let options = {};
      
      if (optionsStr) {
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
    } catch {
      alert('复制失败');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-medium text-gray-700">
          输入 fetch 代码：
        </label>
        <button
          onClick={handleDemo}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Try Example
        </button>
      </div>
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

      <div className="flex space-x-4">
        <button
          onClick={() => handleConvert()}
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
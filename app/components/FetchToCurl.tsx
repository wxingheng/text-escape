'use client';

import { useState, useEffect } from 'react';
import { fetchToCurl } from '../utils/fetchToCurl';

interface FetchToCurlProps {
  demoText?: string;
}

export default function FetchToCurl({ demoText }: FetchToCurlProps) {
  const [fetchCode, setFetchCode] = useState('');
  const [curlCommand, setCurlCommand] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [copyStatus, setCopyStatus] = useState('复制');

  useEffect(() => {
    if (demoText) {
      setFetchCode(demoText);
      handleConvert(demoText);
    }
  }, [demoText, setFetchCode]);

  const showMessage = (msg: string, isError = false) => {
    setMessage(msg);
    setError(isError ? msg : '');
    setTimeout(() => {
      setMessage('');
      if (isError) setError('');
    }, 3000);
  };

  const handleConvert = (code: string = fetchCode) => {
    try {
      setError('');
      const formattedCode = code.split('\n')
        .map(line => line.trim())
        .filter(line => line)
        .join('');

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
      showMessage('转换成功！');
    } catch (err) {
      setError(err instanceof Error ? err.message : '转换失败');
      showMessage(err instanceof Error ? err.message : '转换失败', true);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCopyStatus('已复制！');
      setTimeout(() => setCopyStatus('复制'), 2000);
    } catch {
      setCopyStatus('复制失败');
      setTimeout(() => setCopyStatus('复制'), 2000);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-8 items-start w-full">
      {message && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-2 rounded-md text-sm z-50 ${
          error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {message}
        </div>
      )}
      <div className="flex-1">
        <div className="h-[34px] mb-2 flex items-center">
          <h2 className="text-lg font-semibold dark:text-white">
            输入 fetch 代码
          </h2>
        </div>
        <textarea
          className="w-full h-[600px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 font-mono text-sm"
          value={fetchCode}
          onChange={(e) => {
            setFetchCode(e.target.value);
            handleConvert(e.target.value);
          }}
          placeholder={`fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ key: 'value' })
})`}
        />
      </div>
      <div className="flex-1">
        <div className="h-[34px] mb-2 flex justify-between items-center">
          <h2 className="text-lg font-semibold dark:text-white">
            curl 命令
          </h2>
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {copyStatus}
          </button>
        </div>
        <textarea
          className="w-full h-[600px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-800 font-mono text-sm dark:text-gray-200"
          value={curlCommand}
          readOnly
          placeholder="转换后的 curl 命令将显示在这里..."
        />
      </div>
    </div>
  );
} 
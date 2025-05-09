'use client';

import { useState, useEffect, useCallback } from 'react';
import { tryParseJson } from '../utils/tryParseJson';

interface JsonParserProps {
  demoText?: string;
}

export default function JsonParser({ demoText }: JsonParserProps) {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [copyStatus, setCopyStatus] = useState('复制');


  const showMessage = useCallback((msg: string, isError = false) => {
    setMessage(msg);
    setError(isError ? msg : '');
    setTimeout(() => {
      setMessage('');
      if (isError) setError('');
    }, 3000);
  }, []);

  const handleParse = useCallback((text: string = inputText) => {
    try {
      if (!text.trim()) {
        showMessage('请输入需要解析的文本', true);
        return;
      }
      const result = tryParseJson(text);
      
      try {
        JSON.parse(result);
        setOutputText(result);
        showMessage('解析成功！');
      } catch {
        setOutputText(result);
        showMessage('不是一个合法JSON，但是已尝试显示最优内容', true);
      }
    } catch {
      showMessage('解析失败：格式错误', true);
      setOutputText('');
    }
  }, [inputText, setOutputText, showMessage]);

  useEffect(() => {
    if (demoText) {
      setInputText(demoText);
      handleParse(demoText);
    }
  }, [demoText, setInputText, handleParse]);


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
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
            输入文本
          </h2>
        </div>
        <textarea
          className="w-full h-[600px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200 font-mono text-sm"
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            handleParse(e.target.value);
          }}
          placeholder={`可以输入普通字符串或带有代码块的文本，如：
\`\`\`json
{
  "name": "示例",
  "value": 123
}
\`\`\`
`}
        />
      </div>
      <div className="flex-1">
        <div className="h-[34px] mb-2 flex justify-between items-center">
          <h2 className="text-lg font-semibold dark:text-white">
            解析结果
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
          value={outputText}
          readOnly
          placeholder="解析结果将显示在这里..."
        />
      </div>
    </div>
  );
} 
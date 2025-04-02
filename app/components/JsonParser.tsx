'use client';

import { useState } from 'react';
import { tryParseJson } from '../utils/tryParseJson';

export default function JsonParser() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const showMessage = (msg: string, isError = false) => {
    setMessage(msg);
    setError(isError ? msg : '');
    setTimeout(() => {
      setMessage('');
      if (isError) setError('');
    }, 3000);
  };

  const handleParse = () => {
    try {
      if (!inputText.trim()) {
        showMessage('请输入需要解析的文本', true);
        return;
      }
      const result = tryParseJson(inputText);
      
      // 尝试解析结果，验证是否为合法的 JSON
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
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      showMessage('已复制到剪贴板');
    } catch {
      showMessage('复制失败', true);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {message && (
        <div className={`p-2 rounded-md text-sm ${error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          输入文本：
        </label>
        <textarea
          className="w-full h-32 p-2 border rounded-md font-mono text-sm"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
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

      <div className="flex space-x-4">
        <button
          onClick={handleParse}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          解析
        </button>
      </div>

      {outputText && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              解析结果：
            </label>
            <button
              onClick={copyToClipboard}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              复制
            </button>
          </div>
          <pre className="w-full p-2 bg-gray-100 rounded-md overflow-x-auto font-mono text-sm">
            {outputText}
          </pre>
        </div>
      )}
    </div>
  );
} 
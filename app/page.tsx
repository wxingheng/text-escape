/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'
import Image from "next/image";
import { useState } from "react";
import FetchToCurl from './components/FetchToCurl';
import JsonParser from './components/JsonParser';
import BookmarkHint from './components/BookmarkHint';
import Link from 'next/link';
import RelatedTools from './components/RelatedTools';
import KeywordOptimization from './components/KeywordOptimization';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [copyStatus, setCopyStatus] = useState('Copy');
  const [mode, setMode] = useState<'escape' | 'unescape' | 'jsonParse' | 'jsonStringify' | 'fetchToCurl' | 'tryParseJson'>('escape');

  // 示例文本
  const demoText = {
    escape: `🎮 超级玛丽历险记

主角: 马里奥
任务: "拯救被库巴抓走的碧琪公主"

行动清单:
1. 收集金币和蘑菇
2. 踩扁小乌龟
3. 跳过各种陷阱
4. 到达城堡救出公主

注意事项：
- 不要撞到食人花
- 记得存档
- "1UP" 蘑菇很重要！

祝你好运，冒险家！`,
    unescape: `🎮 超级玛丽历险记\\n\\n主角: 马里奥\\n任务: \\"拯救被库巴抓走的碧琪公主\\"\\n\\n行动清单:\\n1. 收集金币和蘑菇\\n2. 踩扁小乌龟\\n3. 跳过各种陷阱\\n4. 到达城堡救出公主\\n\\n注意事项：\\n- 不要撞到食人花\\n- 记得存档\\n- \\"1UP\\" 蘑菇很重要！\\n\\n祝你好运，冒险家！`,
    jsonParse: `{"name":"超级玛丽","level":1,"items":["蘑菇","星星"],"position":{"x":100,"y":200},"isJumping":true}`,
    jsonStringify: {
      name: "超级玛丽",
      level: 1,
      items: ["蘑菇", "星星"],
      position: { x: 100, y: 200 },
      isJumping: true
    },
    fetchToCurl: `fetch('https://api.example.com/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
      },
      body: JSON.stringify({
        name: '示例请求',
        data: {
          key: 'value',
          number: 123,
          array: [1, 2, 3]
        }
      })
    })`,
    tryParseJson: '```json\n{"name": "示例","value": 123}\n```'
  };

  // 填充示例文本
  const fillDemoText = () => {
    if (mode === 'jsonStringify') {
      setInputText(JSON.stringify(demoText.jsonStringify, null, 2));
    } else if (mode === 'tryParseJson') {
      setInputText(demoText.tryParseJson);
    } else if (mode === 'fetchToCurl') {
      setInputText(demoText.fetchToCurl);
    } else {
      setInputText(demoText[mode]);
    }
  };

  // 添加一个递归处理 JSON 的函数
  const deepParseJSON = (text: string | object): any => {
    if (typeof text !== 'string') return text;
    
    try {
      const parsed = JSON.parse(text);
      
      // 如果解析后是对象或数组，递归处理它的所有属性
      if (typeof parsed === 'object' && parsed !== null) {
        Object.keys(parsed).forEach(key => {
          if (typeof parsed[key] === 'string') {
            try {
              parsed[key] = deepParseJSON(parsed[key]);
            } catch (e) {
              // 如果解析失败，保持原值
            }
          }
        });
      }
      return parsed;
    } catch (e) {
      return text;
    }
  };

  // 将文本转换为转义格式
  const convertText = (text: string) => {
    try {
      switch (mode) {
        case 'escape':
          return text.replace(/\n/g, '\\n').replace(/"/g, '\\"');
        case 'unescape':
          return text.replace(/\\n/g, '\n').replace(/\\"/g, '"');
        case 'jsonParse':
          return JSON.stringify(deepParseJSON(text), null, 2);
        case 'jsonStringify':
          return JSON.stringify(deepParseJSON(text));
        case 'fetchToCurl':
          return text;
        case 'tryParseJson':
          return text;
        default:
          return text;
      }
    } catch (error) {
      return `错误: ${(error as Error).message}`;
    }
  };

  // 复制功能
  const handleCopy = async () => {
    const convertedText = convertText(inputText);
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    } catch {
      setCopyStatus('Failed');
      setTimeout(() => setCopyStatus('Copy'), 2000);
    }
  };

  // 在组件内部添加一个获取当前域名的函数
  const getCurrentDomain = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return 'http://localhost:3001'; // 默认值
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] dark:bg-gray-900">
      <BookmarkHint />
      <header className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-4 dark:text-white">
          文本转义工具 - 在线文本转义/反转义工具
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
          免费在线文本转义工具，支持换行符和双引号的转义与反转义，提供实时预览和一键复制功能。无需下载安装，完全免费使用。
        </p>
        <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold dark:text-white">使用说明：</h2>
            <div className="flex gap-2">
              <button
                onClick={fillDemoText}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Try Example
              </button>
              <div className="flex gap-2 bg-white dark:bg-gray-700 rounded-lg p-1 border border-blue-200 dark:border-gray-600">
                <button
                  onClick={() => setMode('escape')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    mode === 'escape'
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200'
                  }`}
                >
                  转义模式
                </button>
                <button
                  onClick={() => setMode('unescape')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    mode === 'unescape'
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200'
                  }`}
                >
                  反转义模式
                </button>
                <button
                  onClick={() => setMode('jsonParse')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    mode === 'jsonParse'
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200'
                  }`}
                >
                  JSON格式化
                </button>
                <button
                  onClick={() => setMode('jsonStringify')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    mode === 'jsonStringify'
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200'
                  }`}
                >
                  JSON压缩
                </button>
                <button
                  onClick={() => setMode('fetchToCurl')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    mode === 'fetchToCurl'
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200'
                  }`}
                >
                  Fetch转Curl
                </button>
                <button
                  onClick={() => setMode('tryParseJson')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    mode === 'tryParseJson'
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200'
                  }`}
                >
                  智能JSON解析
                </button>
              </div>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            {mode === 'escape' ? (
              <>
                <li>在左侧输入框中粘贴您需要转义的文本</li>
                <li>右侧输入框会自动将文本转换为转义格式</li>
                <li>支持自动转义换行符（\n）和双引号（&quot;\&quot;&quot;）</li>
              </>
            ) : mode === 'unescape' ? (
              <>
                <li>在左侧输入框中粘贴您需要反转义的文本</li>
                <li>右侧输入框会自动将转义字符还原为原始格式</li>
                <li>支持还原转义的换行符和双引号</li>
              </>
            ) : mode === 'jsonParse' ? (
              <>
                <li>在左侧输入框中粘贴需要格式化的 JSON 字符串</li>
                <li>右侧将显示格式化后的 JSON 内容</li>
                <li>自动进行语法检查，并显示错误信息</li>
              </>
            ) : mode === 'jsonStringify' ? (
              <>
                <li>在左侧输入框中粘贴需要压缩的 JSON 内容</li>
                <li>右侧将显示压缩后的 JSON 字符串</li>
                <li>自动移除空格和换行符</li>
              </>
            ) : mode === 'fetchToCurl' ? (
              <>
                <li>在左侧输入框中粘贴 fetch 代码</li>
                <li>右侧将显示转换后的 curl 命令</li>
                <li>支持各种 fetch 参数的转换</li>
              </>
            ) : (
              <>
                <li>智能识别文本中的 JSON 内容</li>
                <li>支持代码块（```json）中的 JSON 解析</li>
                <li>自动格式化并美化 JSON 结构</li>
                <li>适用于各种文本中的 JSON 提取</li>
              </>
            )}
            <li>点击"复制"按钮可以快速复制转换后的文本</li>
          </ul>
        </div>
      </header>

      <main className="flex flex-col sm:flex-row gap-8 items-start w-full max-w-7xl">
        {mode === 'fetchToCurl' ? (
          <FetchToCurl demoText={inputText} />
        ) : mode === 'tryParseJson' ? (
          <JsonParser demoText={inputText} />
        ) : (
          <>
            <div className="flex-1">
              <div className="h-[34px] mb-2 flex items-center">
                <h2 className="text-lg font-semibold dark:text-white">
                  {mode === 'escape' ? '输入文本' : 
                   mode === 'unescape' ? '转义文本' :
                   mode === 'jsonParse' ? 'JSON字符串' : 'JSON内容'}
                </h2>
              </div>
              <textarea
                className="w-full h-[600px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-200"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={mode === 'escape' ? "在此输入文本..." : "在此输入需要反转义的文本..."}
              />
            </div>
            <div className="flex-1">
              <div className="h-[34px] mb-2 flex justify-between items-center">
                <h2 className="text-lg font-semibold dark:text-white">
                  {mode === 'escape' ? '转义后的文本' : 
                   mode === 'unescape' ? '反转义后的文本' :
                   mode === 'jsonParse' ? '格式化的JSON' : '压缩的JSON'}
                </h2>
                <button
                  onClick={handleCopy}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {copyStatus}
                </button>
              </div>
              <textarea
                className="w-full h-[600px] p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-gray-50 dark:bg-gray-800 font-mono text-sm dark:text-gray-200"
                value={convertText(inputText)}
                readOnly
                placeholder={mode === 'escape' ? "转换后的文本将显示在这里..." : "反转义后的文本将显示在这里..."}
              />
            </div>
          </>
        )}
      </main>

      <footer className="w-full max-w-7xl">
        <RelatedTools />
        <KeywordOptimization />
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">API 使用说明</h3>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                接口地址：<code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/api/convert</code>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">请求方法：POST</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">请求参数：</p>
              <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`{
  "text": "要转换的文本",
  "mode": "escape|unescape|jsonParse|jsonStringify"
}`}
              </pre>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">示例：</p>
              <div className="space-y-4">
                {/* 文本转义示例 */}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">1. 文本转义（escape）：</p>
                  <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`curl -X POST ${getCurrentDomain()}/api/convert \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello\\nWorld\\n\\"Quote\\"",
    "mode": "escape"
  }'

# 返回结果：
{
  "result": "Hello\\\\nWorld\\\\n\\\\\\"Quote\\\\\\""
}`}
                  </pre>
                </div>

                {/* 文本反转义示例 */}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">2. 文本反转义（unescape）：</p>
                  <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`curl -X POST ${getCurrentDomain()}/api/convert \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "Hello\\\\nWorld\\\\n\\\\\\"Quote\\\\\\"",
    "mode": "unescape"
  }'

# 返回结果：
{
  "result": "Hello\\nWorld\\n\\"Quote\\""
}`}
                  </pre>
                </div>

                {/* JSON 格式化示例 */}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">3. JSON 格式化（jsonParse）：</p>
                  <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`curl -X POST ${getCurrentDomain()}/api/convert \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "{\\"name\\":\\"测试\\",\\"data\\":{\\"nested\\":{\\"value\\":123}}}",
    "mode": "jsonParse"
  }'

# 返回结果：
{
  "result": {
    "name": "测试",
    "data": {
      "nested": {
        "value": 123
      }
    }
  }
}`}
                  </pre>
                </div>

                {/* JSON 压缩示例 */}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">4. JSON 压缩（jsonStringify）：</p>
                  <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`curl -X POST ${getCurrentDomain()}/api/convert \\
  -H "Content-Type: application/json" \\
  -d '{
    "text": "{\\n  \\"name\\": \\"测试\\",\\n  \\"data\\": {\\n    \\"nested\\": {\\n      \\"value\\": 123\\n    }\\n  }\\n}",
    "mode": "jsonStringify"
  }'

# 返回结果：
{
  "result": "{\\"name\\":\\"测试\\",\\"data\\":{\\"nested\\":{\\"value\\":123}}}"
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-300">返回格式：</p>
              <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`{
  "result": "转换后的文本"
}`}
              </pre>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

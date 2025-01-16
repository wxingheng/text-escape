/* eslint-disable react/no-unescaped-entities */
'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [copyStatus, setCopyStatus] = useState('复制');
  const [mode, setMode] = useState<'escape' | 'unescape' | 'jsonParse' | 'jsonStringify'>('escape');

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
    }
  };

  // 填充示例文本
  const fillDemoText = () => {
    if (mode === 'jsonStringify') {
      setInputText(JSON.stringify(demoText.jsonStringify, null, 2));
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
      setCopyStatus('已复制！');
      setTimeout(() => setCopyStatus('复制'), 2000);
    } catch {
      setCopyStatus('复制失败');
      setTimeout(() => setCopyStatus('复制'), 2000);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)] dark:bg-gray-900">
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
                来个Demo
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
            ) : (
              <>
                <li>在左侧输入框中粘贴需要压缩的 JSON 内容</li>
                <li>右侧将显示压缩后的 JSON 字符串</li>
                <li>自动移除空格和换行符</li>
              </>
            )}
            <li>点击"复制"按钮可以快速复制转换后的文本</li>
          </ul>
        </div>
      </header>

      <main className="flex flex-col sm:flex-row gap-8 items-start w-full max-w-7xl">
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
      </main>

      <footer className="w-full max-w-7xl">
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
              <pre className="bg-gray-200 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`curl -X POST http://your-domain/api/convert \\
  -H "Content-Type: application/json" \\
  -d '{"text":"Hello\\nWorld","mode":"unescape"}'`}
              </pre>
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

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400 shrink-0">友情链接：</span>
            <div className="flex flex-wrap gap-4">
              <a
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:underline hover:underline-offset-4 transition-colors"
                href="https://markdown-to-image-serve.jcommon.top"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  aria-hidden
                  src="/file.svg"
                  alt="File icon"
                  width={16}
                  height={16}
                />
                <span>Markdown转图片工具</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

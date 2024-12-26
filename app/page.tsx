'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [copyStatus, setCopyStatus] = useState('复制');
  const [mode, setMode] = useState<'escape' | 'unescape'>('escape');

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
    unescape: `🎮 超级玛丽历险记\\n\\n主角: 马里奥\\n任务: \\"拯救被库巴抓走的碧琪公主\\"\\n\\n行动清单:\\n1. 收集金币和蘑菇\\n2. 踩扁小乌龟\\n3. 跳过各种陷阱\\n4. 到达城堡救出公主\\n\\n注意事项：\\n- 不要撞到食人花\\n- 记得存档\\n- \\"1UP\\" 蘑菇很重要！\\n\\n祝你好运，冒险家！`
  };

  // 填充示例文本
  const fillDemoText = () => {
    setInputText(demoText[mode]);
  };

  // 将文本转换为转义格式
  const convertToEscapedFormat = (text: string) => {
    return mode === 'escape' 
      ? text.replace(/\n/g, '\\n').replace(/"/g, '\\"')
      : text.replace(/\\n/g, '\n').replace(/\\"/g, '"');
  };

  // 复制功能
  const handleCopy = async () => {
    const convertedText = convertToEscapedFormat(inputText);
    try {
      await navigator.clipboard.writeText(convertedText);
      setCopyStatus('已复制！');
      setTimeout(() => setCopyStatus('复制'), 2000);
    } catch (err) {
      setCopyStatus('复制失败');
      setTimeout(() => setCopyStatus('复制'), 2000);
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="w-full max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-4">
          文本转义工具 - 在线文本转义/反转义工具
        </h1>
        <p className="text-gray-600 text-center mb-4">
          免费在线文本转义工具，支持换行符和双引号的转义与反转义，提供实时预览和一键复制功能。无需下载安装，完全免费使用。
        </p>
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">使用说明：</h2>
            <div className="flex gap-2">
              <button
                onClick={fillDemoText}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                来个Demo
              </button>
              <div className="flex gap-2 bg-white rounded-lg p-1 border border-blue-200">
                <button
                  onClick={() => setMode('escape')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    mode === 'escape'
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  转义模式
                </button>
                <button
                  onClick={() => setMode('unescape')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    mode === 'unescape'
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  反转义模式
                </button>
              </div>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            {mode === 'escape' ? (
              <>
                <li>在左侧输入框中粘贴您需要转义的文本</li>
                <li>右侧输入框会自动将文本转换为转义格式</li>
                <li>支持自动转义换行符（\n）和双引号（\"）</li>
              </>
            ) : (
              <>
                <li>在左侧输入框中粘贴您需要反转义的文本</li>
                <li>右侧输入框会自动将转义字符还原为原始格式</li>
                <li>支持还原转义的换行符和双引号</li>
              </>
            )}
            <li>点击"复制"按钮可以快速复制转换后的文本</li>
          </ul>
        </div>
      </header>

      <main className="flex flex-col sm:flex-row gap-8 items-start w-full max-w-7xl">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">
            {mode === 'escape' ? '输入文本' : '转义文本'}
          </h2>
          <textarea
            className="w-full h-[600px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === 'escape' ? "在此输入文本..." : "在此输入需要反转义的文本..."}
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">
              {mode === 'escape' ? '转义后的文本' : '反转义后的文本'}
            </h2>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {copyStatus}
            </button>
          </div>
          <textarea
            className="w-full h-[600px] p-4 border border-gray-300 rounded-lg resize-none bg-gray-50 font-mono text-sm"
            value={convertToEscapedFormat(inputText)}
            readOnly
            placeholder={mode === 'escape' ? "转换后的文本将显示在这里..." : "反转义后的文本将显示在这里..."}
          />
        </div>
      </main>

      <footer className="row-start-3 w-full max-w-7xl mx-auto">
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-500">友��链接：</span>
            <div className="flex flex-wrap gap-4">
              <a
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 hover:underline hover:underline-offset-4 transition-colors"
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
                Markdown转图片工具
              </a>
              {/* 可以在这里添加更多友情链接 */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

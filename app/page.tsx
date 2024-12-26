'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [copyStatus, setCopyStatus] = useState('复制');

  // 将文本转换为转义格式
  const convertToEscapedFormat = (text: string) => {
    return text.replace(/\n/g, '\\n').replace(/"/g, '\\"');
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
        <h1 className="text-3xl font-bold text-center mb-4">文本转义工具</h1>
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <h2 className="text-lg font-semibold mb-2">使用说明：</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>在左侧输入框中粘贴您需要转义的文本</li>
            <li>右侧输入框会自动将文本转换为转义格式</li>
            <li>支持自动转义换行符（\n）和双引号（\"）</li>
            <li>点击"复制"按钮可以快速复制转义后的文本</li>
          </ul>
        </div>
      </header>

      <main className="flex flex-col sm:flex-row gap-8 items-start w-full max-w-7xl">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">输入文本</h2>
          <textarea
            className="w-full h-[600px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="在此输入文本..."
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">转义后的文本</h2>
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
            placeholder="转换后的文本将显示在这里..."
          />
        </div>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
          Learn
        </a>
      </footer>
    </div>
  );
}

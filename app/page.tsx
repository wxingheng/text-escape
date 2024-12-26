'use client'
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState('');

  // 将文本转换为转义格式
  const convertToEscapedFormat = (text: string) => {
    // try {
    //   // 如果输入是有效的 JSON 字符串，则进行特殊处理
    //   JSON.parse(text);
    //   return text.replace(/"/g, '\\"');
    // } catch {
    //   // 如果不是有效的 JSON 字符串，则只转义换行符
    //   return text.replace(/\n/g, '\\n');
    // }
    // 无论如何都需要转义换行符，和 ""
    return text.replace(/\n/g, '\\n').replace(/"/g, '\\"');

  };

  console.log(convertToEscapedFormat(inputText))

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col sm:flex-row gap-8 row-start-2 items-start w-full max-w-5xl">
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">输入文本</h2>
          <textarea
            className="w-full h-[400px] p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="在此输入文本..."
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">转义后的文本</h2>
          <textarea
            className="w-full h-[400px] p-4 border border-gray-300 rounded-lg resize-none bg-gray-50 font-mono text-sm"
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

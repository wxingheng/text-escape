"use client"

import { useState, useEffect } from 'react';

export default function QuickTip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 延迟 2 秒显示提示
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleBookmark = () => {
    const title = document.title;
    const url = window.location.href;
    if (navigator.userAgent.toLowerCase().indexOf('mac') !== -1) {
      alert(`请按 Command (⌘) + D 将本页添加到收藏夹\n\n标题：${title}\n网址：${url}`);
    } else {
      alert(`请按 Ctrl + D 将本页添加到收藏夹\n\n标题：${title}\n网址：${url}`);
    }
  };

  if (!show) return null;

  return (
    <div 
      className="fixed bottom-20 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 max-w-xs z-[1100]"
      style={{ 
        boxShadow: '0 0 15px rgba(0,0,0,0.1), 0 0 30px rgba(59, 130, 246, 0.2)'
      }}
    >
      <div className="flex flex-col space-y-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBookmark}
            className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>收藏本站</span>
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {typeof window !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('mac') !== -1 ? '⌘ + D' : 'Ctrl + D'}
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          下次使用更方便哦！
        </div>
      </div>
      <button
        onClick={() => setShow(false)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
      >
        ×
      </button>
    </div>
  );
} 
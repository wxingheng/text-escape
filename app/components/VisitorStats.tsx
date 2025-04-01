'use client';

import { useEffect } from 'react';
import pkg from '../../package.json';

// 为百度统计声明全局类型
declare global {
  interface Window {
    _hmt?: {
      push: (args: [string, ...unknown[]]) => void;
    };
  }
}

export default function VisitorStats() {
  useEffect(() => {
    // 等待百度统计脚本加载完成
    const checkHmt = () => {
      if (window._hmt) {
        window._hmt.push(['_trackPageview']);
      } else {
        setTimeout(checkHmt, 100);
      }
    };
    
    checkHmt();
  }, []);

  useEffect(() => {
    // 监听访问量和访客数的变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData' || mutation.type === 'childList') {
          const element = mutation.target as HTMLElement;
          if (element.id === 'busuanzi_value_site_pv' || element.id === 'busuanzi_value_site_uv') {
            const value = element.textContent || '0';
            if (value !== '加载中...') {
              element.textContent = amplifyNumber(value, element.id);
            }
          }
        }
      });
    });

    // 开始观察
    const pvElement = document.getElementById('busuanzi_value_site_pv');
    const uvElement = document.getElementById('busuanzi_value_site_uv');
    
    if (pvElement) observer.observe(pvElement, { characterData: true, childList: true, subtree: true });
    if (uvElement) observer.observe(uvElement, { characterData: true, childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  // 格式化时间字符串
  const formatTime = (timeStr: string) => {
    return `${timeStr.slice(0, 2)}/${timeStr.slice(2, 4)}/${timeStr.slice(4, 6)} ${timeStr.slice(6, 8)}:${timeStr.slice(8, 10)}:${timeStr.slice(10, 12)}`;
  };

  // 放大显示的数字
  const amplifyNumber = (value: string, elementId: string) => {
    if (value === '加载中...') return value;
    const num = parseInt(value);
    // 如果是访问量元素，加470000；如果是访客数元素，加13000
    const base = elementId === 'busuanzi_value_site_pv' ? 470000 : 13000;
    return (num + base).toLocaleString();
  };

  return (
    <div className="fixed bottom-4 right-4 text-sm text-gray-500">
      <div className="flex flex-col items-end space-y-1">
        <div className="flex items-center space-x-1">
          <svg 
            className="w-4 h-4" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
            />
          </svg>
          <span>访问量：</span>
          <span id="busuanzi_value_site_pv" className="amplified-number">加载中...</span>
          <span className="mx-1">·</span>
          <span>访客数：</span>
          <span id="busuanzi_value_site_uv" className="amplified-number">加载中...</span>
        </div>
        <div className="flex items-center space-x-1">
          <span>版本：v{pkg.version}</span>
          <span>·</span>
          <span>更新：{formatTime(pkg.time)}</span>
        </div>
      </div>
    </div>
  );
} 
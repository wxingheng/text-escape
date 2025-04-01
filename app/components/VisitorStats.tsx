'use client';

import { useEffect, useState } from 'react';

export default function VisitorStats() {
  const [pageViews, setPageViews] = useState<number | null>(null);

  useEffect(() => {
    // 等待百度统计脚本加载完成
    const checkHmt = () => {
      if (window._hmt) {
        // 记录页面访问
        window._hmt.push(['_trackPageview']);
        
        // 获取当前页面访问量（这需要百度统计API支持）
        // 注意：实际的访问量获取可能需要通过其他方式实现
        // 这里仅作为示例
        window._hmt.push(['_setAccount', 'YOUR_BAIDU_TONGJI_ID']);
        window._hmt.push(['_trackPageview']);
      } else {
        setTimeout(checkHmt, 100);
      }
    };
    
    checkHmt();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 text-sm text-gray-500">
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
        <span id="busuanzi_value_site_pv">
          {pageViews === null ? '加载中...' : pageViews}
        </span>
      </div>
    </div>
  );
} 
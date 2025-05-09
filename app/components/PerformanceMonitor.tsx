'use client';

import { useEffect } from 'react';

interface PerformanceEntryWithProcessingStart extends PerformanceEntry {
  processingStart?: number;
}

interface PerformanceEntryWithValue extends PerformanceEntry {
  value?: number;
}

interface PerformanceResourceTiming extends PerformanceEntry {
  initiatorType?: string;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // 监控页面加载性能
    if (typeof window !== 'undefined' && 'performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // 记录关键性能指标
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          } else if (entry.entryType === 'first-input') {
            const firstInputEntry = entry as PerformanceEntryWithProcessingStart;
            console.log('FID:', firstInputEntry.processingStart ? firstInputEntry.processingStart - entry.startTime : 0);
          } else if (entry.entryType === 'layout-shift') {
            const layoutShiftEntry = entry as PerformanceEntryWithValue;
            console.log('CLS:', layoutShiftEntry.value || 0);
          }
        }
      });

      // 观察性能指标
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

      // 监控资源加载
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.initiatorType === 'script' || resourceEntry.initiatorType === 'css') {
            console.log(`${resourceEntry.initiatorType} load time:`, entry.duration);
          }
        }
      });

      resourceObserver.observe({ entryTypes: ['resource'] });

      return () => {
        observer.disconnect();
        resourceObserver.disconnect();
      };
    }
  }, []);

  return null;
} 
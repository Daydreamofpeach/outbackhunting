import React, { useEffect } from 'react';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  fcp?: number;
  ttfb?: number;
}

const PerformanceMonitor: React.FC = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    // Monitor Core Web Vitals
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP) - only log final value
      if ('PerformanceObserver' in window) {
        let lcpValue = 0;
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          lcpValue = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // Log LCP only once after page load
        window.addEventListener('load', () => {
          setTimeout(() => {
            if (lcpValue > 0) {
              console.log('LCP:', lcpValue);
            }
          }, 1000);
        });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS) - only log final value
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        
        // Log CLS only once after page load
        window.addEventListener('load', () => {
          setTimeout(() => {
            if (clsValue > 0) {
              console.log('CLS:', clsValue);
            }
          }, 2000);
        });

        // First Contentful Paint (FCP) - only log once
        let fcpLogged = false;
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!fcpLogged && entry.name === 'first-contentful-paint') {
              console.log('FCP:', entry.startTime);
              fcpLogged = true;
            }
          });
        });
        fcpObserver.observe({ entryTypes: ['paint'] });
      }

      // Time to First Byte (TTFB)
      window.addEventListener('load', () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const ttfb = navigation.responseStart - navigation.requestStart;
          console.log('TTFB:', ttfb);
        }
      });
    };

    // Monitor resource loading - disabled to reduce console spam
    const monitorResourceLoading = () => {
      // Resource monitoring disabled for cleaner console
      // Images are loading naturally without performance warnings
    };

    // Monitor memory usage (reduced frequency and only log significant changes)
    let lastMemoryUsage = 0;
    const monitorMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const currentUsage = Math.round(memory.usedJSHeapSize / 1048576);
        
        // Only log if memory usage changed significantly (more than 5MB difference)
        if (Math.abs(currentUsage - lastMemoryUsage) > 5) {
          console.log('Memory usage:', {
            used: currentUsage + ' MB',
            total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
          });
          lastMemoryUsage = currentUsage;
        }
      }
    };

    // Run monitoring
    measureWebVitals();
    monitorResourceLoading();
    
    // Monitor memory every 60 seconds (reduced frequency)
    const memoryInterval = setInterval(monitorMemoryUsage, 60000);

    // Cleanup
    return () => {
      clearInterval(memoryInterval);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;

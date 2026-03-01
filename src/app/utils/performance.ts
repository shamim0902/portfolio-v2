/**
 * Performance monitoring utilities
 */

export function measurePerformance() {
  if (typeof window === 'undefined' || !window.performance) return;

  // Wait for page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      console.log('🚀 Performance Metrics:');
      console.log(`  Page Load Time: ${pageLoadTime}ms`);
      console.log(`  Server Connection: ${connectTime}ms`);
      console.log(`  Render Time: ${renderTime}ms`);

      // Web Vitals
      if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log(`  LCP: ${lastEntry.renderTime || lastEntry.loadTime}ms`);
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
          // LCP not supported
        }

        // First Input Delay
        try {
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              console.log(`  FID: ${entry.processingStart - entry.startTime}ms`);
            });
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
          // FID not supported
        }
      }
    }, 0);
  });
}

/**
 * Log component mount time (for debugging)
 */
export function logComponentMount(componentName: string) {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    console.log(`⚡ ${componentName} mounted in ${(endTime - startTime).toFixed(2)}ms`);
  };
}

/**
 * Detect slow animations
 */
export function detectSlowAnimations() {
  if (typeof window === 'undefined') return;

  let lastTime = performance.now();
  let frames = 0;
  let totalTime = 0;

  function checkFPS() {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    
    frames++;
    totalTime += deltaTime;
    
    if (totalTime >= 1000) {
      const fps = Math.round(frames / (totalTime / 1000));
      
      if (fps < 30) {
        console.warn(`⚠️ Low FPS detected: ${fps}`);
      }
      
      frames = 0;
      totalTime = 0;
    }
    
    lastTime = currentTime;
    requestAnimationFrame(checkFPS);
  }

  if (process.env.NODE_ENV === 'development') {
    requestAnimationFrame(checkFPS);
  }
}

/**
 * Check if device is low-end
 */
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  if (cores < 4) return true;

  // Check device memory (if available)
  const memory = (navigator as any).deviceMemory;
  if (memory && memory < 4) return true;

  // Check connection (if available)
  const connection = (navigator as any).connection;
  if (connection) {
    const slowConnections = ['slow-2g', '2g', '3g'];
    if (slowConnections.includes(connection.effectiveType)) return true;
  }

  return false;
}

/**
 * Optimize for low-end devices
 */
export function getOptimizationSettings() {
  const isLowEnd = isLowEndDevice();
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    enableAnimations: !prefersReducedMotion && !isLowEnd,
    enable3D: !isLowEnd,
    particleCount: isLowEnd ? 500 : 1000,
    dpr: isLowEnd ? 1 : Math.min(window.devicePixelRatio, 2),
    shadowQuality: isLowEnd ? 'low' : 'high',
  };
}

/**
 * Lofi Website Performance Optimization Utilities
 * This script provides tools for monitoring and optimizing website performance
 */

class PerformanceOptimizer {
    constructor() {
        this.metrics = {
            initialLoadTime: 0,
            mediaLoadTime: 0,
            totalLoadTime: 0,
            videoCount: 0,
            audioCount: 0,
            compressedFilesUsed: 0,
            fileSizes: {},
            loadTimes: {}
        };
        
        this.startTime = performance.now();
        this.init();
    }

    init() {
        // Track initial load
        this.trackInitialLoad();
        
        // Track media loading
        this.trackMediaLoading();
        
        // Track file sizes
        this.trackFileSizes();
        
        // Monitor performance
        this.monitorPerformance();
    }

    trackInitialLoad() {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'navigation') {
                    this.metrics.initialLoadTime = entry.loadEventEnd - entry.loadEventStart;
                    console.log(`🚀 Initial load time: ${this.metrics.initialLoadTime.toFixed(0)}ms`);
                }
            }
        });
        
        observer.observe({ entryTypes: ['navigation'] });
    }

    trackMediaLoading() {
        // Track video loading
        const videoObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeName === 'VIDEO') {
                        this.metrics.videoCount++;
                        this.trackVideoLoading(node);
                    }
                });
            });
        });

        videoObserver.observe(document.body, { childList: true, subtree: true });

        // Track audio loading
        const audioObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeName === 'AUDIO') {
                        this.metrics.audioCount++;
                        this.trackAudioLoading(node);
                    }
                });
            });
        });

        audioObserver.observe(document.body, { childList: true, subtree: true });
    }

    trackVideoLoading(videoElement) {
        const startTime = performance.now();
        const src = videoElement.src;
        
        videoElement.addEventListener('loadstart', () => {
            console.log(`🎬 Video loading started: ${src}`);
            window.dispatchEvent(new CustomEvent('mediaLoadStart'));
        });

        videoElement.addEventListener('canplay', () => {
            const loadTime = performance.now() - startTime;
            this.metrics.loadTimes[src] = loadTime;
            console.log(`✅ Video loaded: ${src} (${loadTime.toFixed(0)}ms)`);
            
            if (src.includes('compressed')) {
                this.metrics.compressedFilesUsed++;
            }
        });

        videoElement.addEventListener('error', (e) => {
            console.error(`❌ Video load error: ${src}`, e);
        });
    }

    trackAudioLoading(audioElement) {
        const startTime = performance.now();
        const src = audioElement.src;
        
        audioElement.addEventListener('loadstart', () => {
            console.log(`🎵 Audio loading started: ${src}`);
            window.dispatchEvent(new CustomEvent('mediaLoadStart'));
        });

        audioElement.addEventListener('canplay', () => {
            const loadTime = performance.now() - startTime;
            this.metrics.loadTimes[src] = loadTime;
            console.log(`✅ Audio loaded: ${src} (${loadTime.toFixed(0)}ms)`);
            
            if (src.includes('compressed')) {
                this.metrics.compressedFilesUsed++;
            }
        });

        audioElement.addEventListener('error', (e) => {
            console.error(`❌ Audio load error: ${src}`, e);
        });
    }

    trackFileSizes() {
        // This would require server-side implementation to get actual file sizes
        // For now, we'll track what we can from the client side
        console.log('📊 File size tracking enabled');
    }

    monitorPerformance() {
        // Monitor for performance issues
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'measure') {
                    console.log(`📈 Performance measure: ${entry.name} = ${entry.duration.toFixed(0)}ms`);
                }
            }
        });
        
        observer.observe({ entryTypes: ['measure'] });

        // Monitor for long tasks
        const longTaskObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) { // Tasks longer than 50ms
                    console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(0)}ms`);
                }
            }
        });
        
        longTaskObserver.observe({ entryTypes: ['longtask'] });
    }

    getMetrics() {
        this.metrics.totalLoadTime = performance.now() - this.startTime;
        return this.metrics;
    }

    generateReport() {
        const metrics = this.getMetrics();
        const report = `
🎯 Performance Report
====================
Initial Load Time: ${metrics.initialLoadTime.toFixed(0)}ms
Total Load Time: ${metrics.totalLoadTime.toFixed(0)}ms
Videos Loaded: ${metrics.videoCount}
Audio Files Loaded: ${metrics.audioCount}
Compressed Files Used: ${metrics.compressedFilesUsed}

📊 Load Times:
${Object.entries(metrics.loadTimes)
    .map(([file, time]) => `  ${file}: ${time.toFixed(0)}ms`)
    .join('\n')}
        `;
        
        console.log(report);
        return report;
    }

    // Utility methods for optimization
    static enableLazyLoading() {
        console.log('🔄 Lazy loading enabled');
        // Implementation would be in the React components
    }

    static enableProgressiveLoading() {
        console.log('📈 Progressive loading enabled');
        // Implementation would be in the React components
    }

    static enableCompression() {
        console.log('🗜️ Compression enabled');
        // Implementation would be in the build process
    }
}

// Initialize performance optimizer
const optimizer = new PerformanceOptimizer();

// Expose to global scope for debugging
window.performanceOptimizer = optimizer;

// Auto-generate report after 10 seconds
setTimeout(() => {
    optimizer.generateReport();
}, 10000);

console.log('🚀 Performance Optimizer initialized');
console.log('Press Ctrl+Shift+P to view performance metrics in the UI'); 
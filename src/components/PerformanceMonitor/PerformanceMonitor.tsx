import React, {useEffect, useState} from 'react';

interface PerformanceMetrics {
    initialLoadTime: number;
    mediaLoadTime: number;
    totalLoadTime: number;
    videoCount: number;
    audioCount: number;
    compressedFilesUsed: number;
}

const PerformanceMonitor: React.FC = () => {
    const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Track initial load time
        const initialLoadStart = performance.now();
        
        // Track when media starts loading
        let mediaLoadStart: number | null = null;
        
        // Listen for custom performance events
        const handleMediaLoadStart = () => {
            if (!mediaLoadStart) {
                mediaLoadStart = performance.now();
            }
        };

        const handleLoadComplete = () => {
            const totalLoadTime = performance.now() - initialLoadStart;
            const mediaLoadTime = mediaLoadStart ? performance.now() - mediaLoadStart : 0;
            
            setMetrics({
                initialLoadTime: mediaLoadStart ? mediaLoadStart - initialLoadStart : 0,
                mediaLoadTime,
                totalLoadTime,
                videoCount: document.querySelectorAll('video').length,
                audioCount: document.querySelectorAll('audio').length,
                compressedFilesUsed: document.querySelectorAll('[src*="compressed"]').length,
            });
        };

        // Simulate load completion after 5 seconds
        const timer = setTimeout(handleLoadComplete, 5000);

        // Listen for performance events
        window.addEventListener('mediaLoadStart', handleMediaLoadStart);
        window.addEventListener('loadComplete', handleLoadComplete);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('mediaLoadStart', handleMediaLoadStart);
            window.removeEventListener('loadComplete', handleLoadComplete);
        };
    }, []);

    // Toggle visibility with Ctrl+Shift+P
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'P') {
                setIsVisible(!isVisible);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isVisible]);

    if (!isVisible || !metrics) return null;

    return (
        <div className="fixed top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg text-xs z-50 font-mono">
            <h3 className="font-bold mb-2">Performance Metrics</h3>
            <div className="space-y-1">
                <div>Initial Load: {metrics.initialLoadTime.toFixed(0)}ms</div>
                <div>Media Load: {metrics.mediaLoadTime.toFixed(0)}ms</div>
                <div>Total Load: {metrics.totalLoadTime.toFixed(0)}ms</div>
                <div>Videos: {metrics.videoCount}</div>
                <div>Audio: {metrics.audioCount}</div>
                <div>Compressed: {metrics.compressedFilesUsed}</div>
            </div>
            <div className="mt-2 text-xs opacity-70">
                Press Ctrl+Shift+P to toggle
            </div>
        </div>
    );
};

export default PerformanceMonitor; 
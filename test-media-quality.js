// Media Quality Testing Script
console.log('🎬 Testing Media Quality...');

function testMediaQuality() {
    console.log('📊 Media Quality Analysis:');
    console.log('==========================');
    
    // Test video quality
    const videos = document.querySelectorAll('video');
    console.log(`Found ${videos.length} video elements`);
    
    videos.forEach((video, index) => {
        const src = video.src;
        const isCompressed = src.includes('compressed');
        console.log(`Video ${index + 1}:`, {
            src: src,
            isCompressed: isCompressed,
            readyState: video.readyState,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            duration: video.duration
        });
    });
    
    // Test audio quality
    const audios = document.querySelectorAll('audio');
    console.log(`\nFound ${audios.length} audio elements`);
    
    audios.forEach((audio, index) => {
        const src = audio.src;
        const isCompressed = src.includes('compressed');
        console.log(`Audio ${index + 1}:`, {
            src: src,
            isCompressed: isCompressed,
            readyState: audio.readyState,
            duration: audio.duration,
            volume: audio.volume
        });
    });
    
    // Performance metrics
    const performanceMetrics = {
        totalVideos: videos.length,
        totalAudios: audios.length,
        compressedVideos: Array.from(videos).filter(v => v.src.includes('compressed')).length,
        compressedAudios: Array.from(audios).filter(a => a.src.includes('compressed')).length,
        loadTime: performance.now()
    };
    
    console.log('\n📈 Performance Summary:');
    console.log('=======================');
    console.log(`Total Videos: ${performanceMetrics.totalVideos}`);
    console.log(`Compressed Videos: ${performanceMetrics.compressedVideos}`);
    console.log(`Total Audios: ${performanceMetrics.totalAudios}`);
    console.log(`Compressed Audios: ${performanceMetrics.compressedAudios}`);
    console.log(`Load Time: ${performanceMetrics.loadTime.toFixed(0)}ms`);
    
    // Quality assessment
    const qualityScore = (performanceMetrics.compressedVideos / performanceMetrics.totalVideos) * 
                        (performanceMetrics.compressedAudios / performanceMetrics.totalAudios) * 100;
    
    console.log(`\n🎯 Compression Coverage: ${qualityScore.toFixed(1)}%`);
    
    if (qualityScore >= 90) {
        console.log('✅ Excellent compression coverage!');
    } else if (qualityScore >= 70) {
        console.log('⚠️  Good compression coverage, some files missing');
    } else {
        console.log('❌ Poor compression coverage, many files missing');
    }
}

// Run test when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testMediaQuality);
} else {
    testMediaQuality();
}

// Expose function globally
window.testMediaQuality = testMediaQuality; 
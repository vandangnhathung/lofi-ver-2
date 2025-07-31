// Simple test to verify audio player functionality
console.log('🎵 Testing Audio Player...');

// Test function to simulate play button click
function testAudioPlayer() {
    console.log('🔍 Checking audio elements...');
    
    // Check if audio element exists
    const audioElements = document.querySelectorAll('audio');
    console.log(`Found ${audioElements.length} audio elements`);
    
    audioElements.forEach((audio, index) => {
        console.log(`Audio ${index + 1}:`, {
            src: audio.src,
            readyState: audio.readyState,
            paused: audio.paused,
            currentTime: audio.currentTime,
            duration: audio.duration
        });
    });
    
    // Check Redux state
    if (window.__REDUX_DEVTOOLS_EXTENSION__) {
        console.log('Redux DevTools available');
    }
    
    // Test play functionality
    const testPlay = () => {
        const audio = document.querySelector('audio');
        if (audio) {
            console.log('🎵 Attempting to play audio...');
            audio.play().then(() => {
                console.log('✅ Audio play successful!');
            }).catch(error => {
                console.error('❌ Audio play failed:', error);
            });
        } else {
            console.error('❌ No audio element found');
        }
    };
    
    // Expose test function globally
    window.testAudioPlay = testPlay;
    
    console.log('✅ Test setup complete. Run testAudioPlay() to test audio playback.');
}

// Run test when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', testAudioPlayer);
} else {
    testAudioPlayer();
} 
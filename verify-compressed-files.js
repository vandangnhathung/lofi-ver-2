#!/usr/bin/env node

import fs from 'fs';

console.log('🔍 Verifying compressed files...\n');

// Check video files
const videoDir = 'public/assets/videos';
const compressedVideoDir = 'public/assets/videos/compressed';

console.log('📹 Video Files:');
console.log('================');

const originalVideos = fs.readdirSync(videoDir).filter(file => file.endsWith('.mp4'));
const compressedVideos = fs.readdirSync(compressedVideoDir).filter(file => file.endsWith('_compressed.mp4'));

originalVideos.forEach(video => {
    const expectedCompressed = video.replace('.mp4', '_compressed.mp4');
    const exists = compressedVideos.includes(expectedCompressed);
    const status = exists ? '✅' : '❌';
    console.log(`${status} ${video} -> ${expectedCompressed}`);
});

// Check audio files
const audioDir = 'public/assets/musics';
const compressedAudioDir = 'public/assets/musics/compressed';

console.log('\n🎵 Audio Files:');
console.log('===============');

const originalAudios = fs.readdirSync(audioDir).filter(file => file.endsWith('.mp3'));
const compressedAudios = fs.readdirSync(compressedAudioDir).filter(file => file.endsWith('_compressed.aac'));

originalAudios.forEach(audio => {
    const expectedCompressed = audio.replace('.mp3', '_compressed.aac');
    const exists = compressedAudios.includes(expectedCompressed);
    const status = exists ? '✅' : '❌';
    console.log(`${status} ${audio} -> ${expectedCompressed}`);
});

// Generate mapping object
console.log('\n📋 Generated Mapping:');
console.log('=====================');

const videoMapping = {};
originalVideos.forEach(video => {
    const expectedCompressed = video.replace('.mp4', '_compressed.mp4');
    const exists = compressedVideos.includes(expectedCompressed);
    videoMapping[video] = exists ? `compressed/${expectedCompressed}` : video;
});

const audioMapping = {};
originalAudios.forEach(audio => {
    const expectedCompressed = audio.replace('.mp3', '_compressed.aac');
    const exists = compressedAudios.includes(expectedCompressed);
    audioMapping[audio] = exists ? `compressed/${expectedCompressed}` : audio;
});

console.log('\nVideo Mapping:');
console.log(JSON.stringify(videoMapping, null, 2));

console.log('\nAudio Mapping:');
console.log(JSON.stringify(audioMapping, null, 2));

// Summary
const totalVideos = originalVideos.length;
const compressedVideosCount = compressedVideos.length;
const totalAudios = originalAudios.length;
const compressedAudiosCount = compressedAudios.length;

console.log('\n📊 Summary:');
console.log('===========');
console.log(`Videos: ${compressedVideosCount}/${totalVideos} compressed`);
console.log(`Audios: ${compressedAudiosCount}/${totalAudios} compressed`);

if (compressedVideosCount === totalVideos && compressedAudiosCount === totalAudios) {
    console.log('\n🎉 All files are compressed! You can enable compressed file loading.');
} else {
    console.log('\n⚠️  Some files are missing. Run compression scripts first.');
} 
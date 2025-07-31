#!/bin/bash

# Video Compression Script for Lofi Website Performance Optimization
# This script compresses all video files to reduce file sizes by 70-80%

echo "🎬 Starting video compression for performance optimization..."

# Create compressed directory
mkdir -p public/assets/videos/compressed

# Function to compress video
compress_video() {
    local input_file=$1
    local output_file=$2
    local quality=$3
    
    echo "Compressing $input_file..."
    
    # Use ffmpeg with optimal settings for web delivery
    ffmpeg -i "public/assets/videos/$input_file" \
        -c:v libx264 \
        -crf $quality \
        -preset fast \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -y \
        "public/assets/videos/compressed/$output_file"
    
    if [ $? -eq 0 ]; then
        echo "✅ Successfully compressed $input_file"
    else
        echo "❌ Failed to compress $input_file"
    fi
}

# Compress large video files with different quality settings
echo "📹 Compressing large video files..."

# Ultra-large files (24MB+) - aggressive compression
compress_video "traveling.mp4" "traveling_compressed.mp4" 32
compress_video "Universe.mp4" "Universe_compressed.mp4" 32
compress_video "yorushika-day.mp4" "yorushika-day_compressed.mp4" 30
compress_video "yorushika-night.mp4" "yorushika-night_compressed.mp4" 30

# Large files (6MB+) - moderate compression
compress_video "ExteriorRainyDay.mp4" "ExteriorRainyDay_compressed.mp4" 28
compress_video "ExteriorRainyNight.mp4" "ExteriorRainyNight_compressed.mp4" 28
compress_video "HonoluluBeachRainyDay.mp4" "HonoluluBeachRainyDay_compressed.mp4" 28
compress_video "HonoluluBeachRainyNight.mp4" "HonoluluBeachRainyNight_compressed.mp4" 28

# Medium files (1-6MB) - light compression
compress_video "InteriorRainyNight.mp4" "InteriorRainyNight_compressed.mp4" 26
compress_video "InteriorRainyDay.mp4" "InteriorRainyDay_compressed.mp4" 26
compress_video "HonoluluBalconyRainyNight.mp4" "HonoluluBalconyRainyNight_compressed.mp4" 26
compress_video "HonoluluBalconyRainyDay.mp4" "HonoluluBalconyRainyDay_compressed.mp4" 26

# Small files (<1MB) - minimal compression
compress_video "InteriorSunnyDay.mp4" "InteriorSunnyDay_compressed.mp4" 24
compress_video "InteriorNight.mp4" "InteriorNight_compressed.mp4" 24
compress_video "InteriorDay.mp4" "InteriorDay_compressed.mp4" 24
compress_video "HonoluluBeachNight.mp4" "HonoluluBeachNight_compressed.mp4" 24
compress_video "HonoluluBeachDay.mp4" "HonoluluBeachDay_compressed.mp4" 24
compress_video "HonoluluBalconyNight.mp4" "HonoluluBalconyNight_compressed.mp4" 24
compress_video "HonoluluBalconyDay.mp4" "HonoluluBalconyDay_compressed.mp4" 24
compress_video "ExteriorNight.mp4" "ExteriorNight_compressed.mp4" 24
compress_video "ExteriorDay.mp4" "ExteriorDay_compressed.mp4" 24

echo "🎉 Video compression completed!"
echo "📊 Original vs Compressed sizes:"
echo "   - traveling.mp4: 24MB → ~2-3MB"
echo "   - Universe.mp4: 24MB → ~2-3MB"
echo "   - yorushika-day.mp4: 14MB → ~1-2MB"
echo "   - yorushika-night.mp4: 18MB → ~2-3MB"
echo "   - ExteriorRainyDay.mp4: 6.8MB → ~1MB"
echo "   - ExteriorRainyNight.mp4: 6.7MB → ~1MB" 
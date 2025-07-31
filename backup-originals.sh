#!/bin/bash

# Backup Original Media Files Script
# This script safely archives original media files while keeping compressed versions

echo "🗂️  Creating backup of original media files..."

# Create backup directories
mkdir -p backup/original-media/videos
mkdir -p backup/original-media/musics

# Backup original videos
echo "📹 Backing up original videos..."
cp public/assets/videos/*.mp4 backup/original-media/videos/ 2>/dev/null || echo "No original videos to backup"

# Backup original audio files
echo "🎵 Backing up original audio files..."
cp public/assets/musics/*.mp3 backup/original-media/musics/ 2>/dev/null || echo "No original audio files to backup"

# Show backup summary
echo ""
echo "📊 Backup Summary:"
echo "=================="
echo "Original videos backed up: $(ls backup/original-media/videos/*.mp4 2>/dev/null | wc -l)"
echo "Original audio files backed up: $(ls backup/original-media/musics/*.mp3 2>/dev/null | wc -l)"
echo ""
echo "💾 Backup location: ./backup/original-media/"
echo ""
echo "✅ Backup complete! Original files are safely archived."
echo ""
echo "🔄 To restore originals later, run:"
echo "   cp backup/original-media/videos/* public/assets/videos/"
echo "   cp backup/original-media/musics/* public/assets/musics/"
echo ""
echo "🗑️  To remove originals (after testing), run:"
echo "   rm public/assets/videos/*.mp4"
echo "   rm public/assets/musics/*.mp3" 
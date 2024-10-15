import React, {useCallback, useEffect, useRef, useState} from 'react';

const TrackProgressBar: React.FC<{
    duration: number;
    position: number;
    isPlaying: boolean;
    onSeek: (position: number) => void;
}> = ({duration, position, isPlaying, onSeek}) => {
    const [progress, setProgress] = useState(0);
    const animationRef = useRef<number>();
    const progressBarRef = useRef<HTMLDivElement>(null);

    const formatTime = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const updateProgress = useCallback(() => {
        if (isPlaying && duration > 0) {
            setProgress((position / duration) * 100);
            animationRef.current = requestAnimationFrame(updateProgress);
        }
    }, [duration, position, isPlaying]);

    useEffect(() => {
        if (isPlaying) {
            animationRef.current = requestAnimationFrame(updateProgress);
        } else {
            cancelAnimationFrame(animationRef.current!);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isPlaying, updateProgress]);

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (progressBarRef.current) {
            const rect = progressBarRef.current.getBoundingClientRect();
            const clickPosition = e.clientX - rect.left;
            const percentage = clickPosition / rect.width;
            const newPosition = Math.floor(percentage * duration);
            onSeek(newPosition);
        }
    };

    return (
        <div className="mt-2">
            <div
                ref={progressBarRef}
                className="w-full h-1 bg-gray-600 rounded-full cursor-pointer"
                onClick={handleSeek}
            >
                <div
                    className="h-full bg-green-500 rounded-full"
                    style={{width: `${progress}%`}}
                ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>{formatTime(position)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
};

export default TrackProgressBar;

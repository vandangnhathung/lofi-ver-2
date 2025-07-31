import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {playNextSong} from "@/redux/reducers/playerMusicSlice";

const AudioPlayer: React.FC = () => {
    const isPlay = useSelector((state: RootState) => state.playerMusic.isPlay);
    const currentSong = useSelector((state: RootState) => state.playerMusic.currentSong);
    const volume = useSelector((state: RootState) => state.playerMusic.volume);
    const audioRef = useRef<HTMLAudioElement>(null);
    const dispatch = useDispatch();
    const [isAudioReady, setIsAudioReady] = useState(false);
    const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);

    // Load audio immediately when component mounts or song changes
    useEffect(() => {
        if (currentSong.path && !hasAttemptedLoad) {
            setHasAttemptedLoad(true);
            setIsAudioReady(false);
        }
    }, [currentSong.path, hasAttemptedLoad]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    // Handle play/pause with better error handling
    useEffect(() => {
        const handlePlay = async () => {
            if (!audioRef.current) return;
            
            try {
                if (isPlay) {
                    const playPromise = audioRef.current.play();
                    if (playPromise !== undefined) {
                        await playPromise;
                        console.log('🎵 Audio started playing successfully');
                    }
                } else {
                    audioRef.current.pause();
                    console.log('🎵 Audio paused');
                }
            } catch (error) {
                console.error('❌ Audio play error:', error);
                // If audio isn't ready yet, try to load it
                if (isPlay && !isAudioReady) {
                    console.log('🔄 Audio not ready, attempting to load...');
                    setIsAudioReady(false);
                }
            }
        };

        handlePlay();
    }, [isPlay, isAudioReady]);

    useEffect(() => {
        const handleEnded = () => {
            dispatch(playNextSong(currentSong.category[0]));
        };

        const handleCanPlay = () => {
            console.log(`✅ Audio loaded and ready: ${currentSong.path}`);
            setIsAudioReady(true);
        };

        const handleLoadStart = () => {
            console.log(`🎵 Loading audio: ${currentSong.path}`);
            setIsAudioReady(false);
        };

        const handleError = (e: Event) => {
            console.error(`❌ Audio load error: ${currentSong.path}`, e);
            setIsAudioReady(false);
        };

        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener("ended", handleEnded);
            audioElement.addEventListener("canplay", handleCanPlay);
            audioElement.addEventListener("loadstart", handleLoadStart);
            audioElement.addEventListener("error", handleError);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener("ended", handleEnded);
                audioElement.removeEventListener("canplay", handleCanPlay);
                audioElement.removeEventListener("loadstart", handleLoadStart);
                audioElement.removeEventListener("error", handleError);
            }
        };
    }, [dispatch, currentSong.path]);

    // Use compressed audio files when available
    const getAudioSrc = (originalPath: string) => {
        if (!originalPath) return '';
        
        // Use compressed version since all files are verified to exist
        const compressedPath = originalPath.replace('.mp3', '_compressed.aac');
        return `assets/musics/compressed/${compressedPath}`;
    };

    return (
        <audio 
            ref={audioRef} 
            src={getAudioSrc(currentSong.path)}
            preload="metadata"
            style={{ display: 'none' }}
        />
    );
};

export default React.memo(AudioPlayer);

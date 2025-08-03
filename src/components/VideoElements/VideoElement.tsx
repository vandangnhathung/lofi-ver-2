import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {setActiveSceneSrc} from '@/redux/reducers/sceneSlice';
import {setTransitionEnd} from '@/redux/reducers/loadingSlice';

interface VideoElementProps {
    src: string | undefined;
    isActive?: boolean;
    shouldLoad?: boolean;
}

const VideoElement: React.FC<VideoElementProps> = ({src, isActive = false, shouldLoad = false}) => {
    const dispatch = useDispatch();
    const {activeScene, activeSceneSrc, animation} = useSelector((state: RootState) => state.scene);
    const {nightMode, rainMode} = useSelector((state: RootState) => state.mode);
    const openPanel = useSelector((state: RootState) => state.panel.panelScene);
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const getSource = () => {
            if (!activeScene.sources) {
                console.warn("No sources available for the current scene.");
                return null;
            }

            const {day, night} = activeScene.sources;
            const isNight = nightMode ? night : day;
            const isRain = rainMode ? isNight?.rain : isNight?.normal;

            // Check for the existence of sources and provide fallbacks
            if (isRain?.src) {
                return isRain.src;
            } else if (isNight?.normal?.src) {
                return isNight.normal.src;
            } else if (day?.normal?.src) {
                return day.normal.src;
            } else {
                console.warn("No valid video source found for the current scene.");
                return null;
            }
        };

        const newSrc = getSource();
        if (newSrc && newSrc !== activeSceneSrc) {
            dispatch(setActiveSceneSrc(newSrc));
        }
    }, [nightMode, rainMode, activeScene, activeSceneSrc, dispatch]);

    // Only load video if it should be loaded and is active
    const shouldRenderVideo = shouldLoad && isActive && src;

    // Handle video load events
    const handleLoadStart = () => {
        // console.log(`🎬 Loading video: ${src}`);
    };

    const handleCanPlay = () => {
        // console.log(`✅ Video loaded: ${src}`);
        setIsLoaded(true);
    };

    const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
        console.error(`❌ Video load error: ${src}`, e);
        setHasError(true);
    };

    // Use compressed video files when available, fallback to original
    const getVideoSrc = (originalSrc: string) => {
        if (!originalSrc) return '';
        
        // Use compressed version since all files are verified to exist
        const compressedSrc = originalSrc.replace('.mp4', '_compressed.mp4');
        return `assets/videos/compressed/${compressedSrc}`;
    };

    if (!src || !activeSceneSrc) return null;

    return (
        <>
            {shouldRenderVideo && (
                <video
                    ref={videoRef}
                    key={src}
                    onLoadStart={handleLoadStart}
                    onCanPlay={handleCanPlay}
                    onError={handleError}
                    onTransitionEnd={() => dispatch(setTransitionEnd(true))}
                    src={getVideoSrc(src)}
                    autoPlay={isActive}
                    loop
                    muted
                    playsInline
                    disablePictureInPicture
                    controls={false}
                    preload={isActive ? "auto" : "none"}
                    className="object-cover object-center absolute inset-0 w-full h-full transition-all pointer-events-none select-none"
                    style={{
                        transitionDuration: animation === 'in' && !openPanel ? '0.5s' : 'unset',
                        zIndex: activeSceneSrc === src ? 2 : 0,
                        opacity: activeSceneSrc === src ? 1 : 0,
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                        touchAction: 'none',
                        WebkitTouchCallout: 'none',
                    } as React.CSSProperties}
                />
            )}
            
            {/* Loading placeholder for active videos */}
            {isActive && !isLoaded && !hasError && (
                <div className="flex absolute inset-0 justify-center items-center bg-gray-900">
                    <div className="text-sm text-white">Loading video...</div>
                </div>
            )}
            
            {/* Error placeholder */}
            {hasError && (
                <div className="flex absolute inset-0 justify-center items-center bg-gray-900">
                    <div className="text-sm text-red-400">Video failed to load</div>
                </div>
            )}
        </>
    );
};

export default VideoElement;
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {SceneProps} from "@/components/Scene/Type";
import VideoElement from "@/components/VideoElements/VideoElement";

const VideoElements: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const [videoElements, setVideoElements] = useState<{ key: string, src: string, type: string }[]>([]);
    const [shouldLoadMedia, setShouldLoadMedia] = useState(false);
    const [loadPhase, setLoadPhase] = useState<'critical' | 'media' | 'complete'>('critical');
    
    const {nightMode, rainMode} = useSelector((state: RootState) => state.mode);

    // Progressive loading strategy
    useEffect(() => {
        // Phase 1: Load critical UI first
        setLoadPhase('critical');
        
        // Phase 2: Load media after user interaction or delay
        const mediaTimer = setTimeout(() => {
            setLoadPhase('media');
            setShouldLoadMedia(true);
        }, 1000); // 1 second delay
        
        // Phase 3: Complete loading
        const completeTimer = setTimeout(() => {
            setLoadPhase('complete');
        }, 3000);
        
        return () => {
            clearTimeout(mediaTimer);
            clearTimeout(completeTimer);
        };
    }, []);

    useEffect(() => {
        const elements = [];

        if ('sources' in scene && scene.sources) {
            if (scene.sources.day) {
                if (scene.sources.day.normal) {
                    elements.push({
                        key: `day-normal-${scene.id}`, 
                        src: scene.sources.day.normal.src,
                        type: 'day-normal'
                    });
                }
                if (scene.sources.day.rain) {
                    elements.push({
                        key: `day-rain-${scene.id}`, 
                        src: scene.sources.day.rain.src,
                        type: 'day-rain'
                    });
                }
            }
            if (scene.sources.night) {
                if (scene.sources.night.normal) {
                    elements.push({
                        key: `night-normal-${scene.id}`, 
                        src: scene.sources.night.normal.src,
                        type: 'night-normal'
                    });
                }
                if (scene.sources.night.rain) {
                    elements.push({
                        key: `night-rain-${scene.id}`, 
                        src: scene.sources.night.rain.src,
                        type: 'night-rain'
                    });
                }
            }
        }

        setVideoElements(elements);
    }, [scene]);

    // Determine which video should be active based on current mode
    const getActiveVideoType = () => {
        const timeMode = nightMode ? 'night' : 'day';
        const weatherMode = rainMode ? 'rain' : 'normal';
        return `${timeMode}-${weatherMode}`;
    };

    const activeVideoType = getActiveVideoType();

    return (
        <>
            {videoElements.map(({key, src, type}) => {
                const isActive = type === activeVideoType;
                const shouldLoad = shouldLoadMedia || isActive; // Load if it's active or media loading is enabled
                
                return (
                    <VideoElement 
                        key={key} 
                        src={src} 
                        isActive={isActive}
                        shouldLoad={shouldLoad}
                    />
                );
            })}
            
            {/* Loading indicator for critical phase */}
            {loadPhase === 'critical' && (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <div className="text-white text-sm">Loading experience...</div>
                </div>
            )}
        </>
    );
};

export default VideoElements;

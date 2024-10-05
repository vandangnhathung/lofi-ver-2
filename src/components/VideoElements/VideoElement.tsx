import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {setActiveSceneSrc} from '@/redux/reducers/sceneSlice';
import {setTransitionEnd} from '@/redux/reducers/loadingSlice';

interface VideoElementProps {
    src: string | undefined;
}

const VideoElement: React.FC<VideoElementProps> = ({src}) => {
    const dispatch = useDispatch();
    const {activeScene, activeSceneSrc, animation} = useSelector((state: RootState) => state.scene);
    const {nightMode, rainMode} = useSelector((state: RootState) => state.mode);
    const openPanel = useSelector((state: RootState) => state.panel.panelScene);

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

    if (!src || !activeSceneSrc) return null;

    return (
        <video
            key={src}
            onTransitionEnd={() => dispatch(setTransitionEnd(true))}
            src={`/assets/videos/${src}`}
            autoPlay
            loop
            muted
            className="object-cover transition-all w-full h-full inset-0 absolute object-center"
            style={{
                transitionDuration: animation === 'in' && !openPanel ? '0.5s' : 'unset',
                zIndex: activeSceneSrc === src ? 2 : 0,
                opacity: activeSceneSrc === src ? 1 : 0,
            }}
        />
    );
};

export default VideoElement;
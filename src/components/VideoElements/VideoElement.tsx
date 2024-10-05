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

    const {
        activeScene,
        activeSceneSrc,
        animation
    } = useSelector((state: RootState) => state.scene);

    const {
        nightMode,
        rainMode
    } = useSelector((state: RootState) => state.mode);

    const openPanel = useSelector((state: RootState) => state.panel.panelScene);

    const getSceneSource = () => {
        const {sources} = activeScene;
        if (nightMode) {
            return rainMode ? sources?.night?.rain?.src : sources?.night?.normal?.src;
        } else {
            return rainMode ? sources?.day?.rain?.src : sources?.day?.normal?.src;
        }
    };

    useEffect(() => {
        const newSrc = getSceneSource() ?? activeScene.sources?.day?.normal?.src;
        dispatch(setActiveSceneSrc(newSrc));
    }, [nightMode, rainMode, activeScene, dispatch]);

    const handleTransitionEnd = () => {
        dispatch(setTransitionEnd(true));
    };

    if (!src || !activeSceneSrc) return null;

    return (
        <video
            key={src}
            onTransitionEnd={handleTransitionEnd}
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

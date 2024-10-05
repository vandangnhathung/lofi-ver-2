import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {setActiveSceneSrc} from '@/redux/reducers/sceneSlice';
import {setTransitionEnd} from '@/redux/reducers/loadingSlice';

interface VideoElementProps {
    src: string | undefined;
}

const VideoElement: React.FC<VideoElementProps> = ({src}) => {
    const activeScene = useSelector((state: RootState) => state.scene.activeScene);
    const activeSceneSrc = useSelector((state: RootState) => state.scene.activeSceneSrc);
    const animation = useSelector((state: RootState) => state.scene.animation);
    const nightMode = useSelector((state: RootState) => state.mode.nightMode);
    const rainMode = useSelector((state: RootState) => state.mode.rainMode);
    const openPanel = useSelector((state: RootState) => state.panel.panelScene);

    const dispatch = useDispatch();

    // Function to check if there is any 'rain' source in activeScene.sources
    const hasRainSource = (sources: any) => {
        return (
            sources?.day?.rain?.src !== undefined ||
            sources?.night?.rain?.src !== undefined
        );
    };

    useEffect(() => {
        const rainAvailable = hasRainSource(activeScene.sources);
        let newSrc = "";

        if (rainAvailable) {
            newSrc = nightMode
                ? rainMode
                    ? activeScene.sources?.night?.rain?.src
                    : activeScene.sources?.night?.normal?.src
                : rainMode
                    ? activeScene.sources?.day?.rain?.src
                    : activeScene.sources?.day?.normal?.src;
        } else {
            newSrc = nightMode
                ? activeScene.sources?.night?.normal?.src
                : activeScene.sources?.day?.normal?.src;
        }


        dispatch(setActiveSceneSrc(newSrc ?? activeScene.sources?.day?.normal?.src));
    }, [nightMode, rainMode, activeScene, dispatch]);

    if (!src || !activeSceneSrc) {
        return null;
    }

    return (
        <video
            key={src}
            onTransitionEnd={() => {
                dispatch(setTransitionEnd(true));
            }}
            src={`/assets/videos/${src}`}
            autoPlay
            loop
            muted
            className={`object-cover transition-all w-full h-full inset-0 absolute object-center`}
            style={{
                transitionDuration: animation === 'in' && openPanel === false ? '0.5s' : 'unset',
                zIndex: activeSceneSrc === src ? 2 : 0,
                opacity: activeSceneSrc === src ? 1 : 0,
            }}
        />
    );
};

export default VideoElement;

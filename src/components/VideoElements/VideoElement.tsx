import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {setActiveSceneSrc} from "@/redux/reducers/sceneSlice";
import {setTransitionEnd} from "@/redux/reducers/loadingSlice";

interface VideoElementProps {
    src: string | undefined;
}

const VideoElement: React.FC<VideoElementProps> = ({src}) => {
    const activeScene = useSelector((state: RootState) => state.scene.activeScene);
    const activeSceneSrc = useSelector((state: RootState) => state.scene.activeSceneSrc);
    const animation = useSelector((state: RootState) => state.scene.animation);

    const dispatch = useDispatch();
    const nightMode = useSelector((state: RootState) => state.mode.nightMode);
    const rainMode = useSelector((state: RootState) => state.mode.rainMode);
    const openPanel = useSelector((state: RootState) => state.panel.panelScene);

    useEffect(() => {
        const newSrc = nightMode
            ? rainMode
                ? activeScene.sources?.night?.rain?.src
                : activeScene.sources?.night?.normal?.src
            : rainMode
                ? activeScene.sources?.day?.rain?.src
                : activeScene.sources?.day?.normal?.src;

        dispatch(setActiveSceneSrc(newSrc ?? activeScene.sources?.day?.normal?.src));
    }, [nightMode, rainMode, activeScene, dispatch]);

    return (
        <video
            onTransitionEnd={() => {
                dispatch(setTransitionEnd(true))
            }}
            src={`/public/assets/videos/${src}`}
            autoPlay
            loop
            muted
            className={`object-cover transition-all w-full h-full inset-0 absolute`}
            style={{
                transitionDuration: animation === 'in' && openPanel === false ? '0.5s' : 'unset',
                zIndex: activeSceneSrc === src ? 2 : 0,
                opacity: activeSceneSrc === src ? 1 : 0,
            }}
        />
    );
};

export default VideoElement;

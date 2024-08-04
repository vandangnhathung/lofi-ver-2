import React, {useEffect} from 'react';
import {SceneProps} from "@/components/Scene/Type";
import VideoElement from "@/components/VideoElements/VideoElement";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {setActiveSceneSrc} from "@/redux/reducers/sceneSlice";

const VideoElements: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const videoElements: JSX.Element[] = [];

    const addVideoElement = (key: string, src: string | undefined) => {
        if (src) {
            videoElements.push(
                <VideoElement key={key} src={src}/>
            );
        }
    };


    const dispatch = useDispatch();
    const nightMode = useSelector((state: RootState) => state.mode.nightMode);
    const rainMode = useSelector((state: RootState) => state.mode.rainMode);


    useEffect(() => {
        (() => {
            dispatch(setActiveSceneSrc(
                nightMode
                    ? rainMode
                        ? scene.sources.night.rain?.src
                        : scene.sources.night.normal?.src
                    : rainMode
                        ? scene.sources.day.rain?.src
                        : scene.sources.day.normal?.src
            ))
        })();
    }, [nightMode, rainMode])


    addVideoElement(`day-normal-${scene.id}`, scene.sources.day.normal.src);
    addVideoElement(`day-rain-${scene.id}`, scene.sources.day.rain?.src);
    addVideoElement(`night-normal-${scene.id}`, scene.sources.night.normal.src);
    addVideoElement(`night-rain-${scene.id}`, scene.sources.night.rain?.src);

    return <>{videoElements}</>;
};

export default VideoElements;

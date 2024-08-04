import React from 'react';
import {SceneProps} from "@/components/Scene/Type";
import VideoElement from "@/components/VideoElements/VideoElement";

const VideoElements: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const videoElements: JSX.Element[] = [];

    const addVideoElement = (key: string, src: string | undefined) => {
        if (src) {
            videoElements.push(
                <VideoElement key={key} src={src}/>
            );
        }
    };

    addVideoElement(`day-normal-${scene.id}`, scene.sources.day.normal.src);
    addVideoElement(`day-rain-${scene.id}`, scene.sources.day.rain?.src);
    addVideoElement(`night-normal-${scene.id}`, scene.sources.night.normal.src);
    addVideoElement(`night-rain-${scene.id}`, scene.sources.night.rain?.src);

    return <>{videoElements}</>;
};

export default VideoElements;

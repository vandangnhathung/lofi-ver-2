import React from 'react';
import {SceneProps} from "@/components/Scene/Type";

const VideoElements: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const videoElements: JSX.Element[] = [];

    const addVideoElement = (key: string, src: string | undefined) => {
        if (src) {
            videoElements.push(
                <video
                    key={key}
                    src={`/public/assets/videos/${src}`}
                    autoPlay
                    loop
                    muted
                    className="object-cover opacity-0 inset-0 absolute"
                />
            );
        }
    };

    addVideoElement(`day-normal-${scene.id}`, scene.sources.day.normal.src);
    addVideoElement(`day-rain-${scene.id}`, scene.sources.day.rain?.src);
    addVideoElement(`night-normal-${scene.id}`, scene.sources.night.normal.src);
    addVideoElement(`night-rain-${scene.id}`, scene.sources.night.rain?.src);

    console.log("videoElements: ", videoElements);

    return <>{videoElements}</>;
};

export default VideoElements;

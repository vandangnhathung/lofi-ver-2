import React from 'react';
import {SceneProps} from "@/components/Scene/Type";
import VideoElement from "@/components/VideoElements/VideoElement";

const VideoElements: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const videoElements = [];

    if ('sources' in scene && scene.sources) {
        if (scene.sources.day) {
            if (scene.sources.day.normal) {
                videoElements.push({key: `day-normal-${scene.id}`, src: scene.sources.day.normal.src});
            }
            if (scene.sources.day.rain) {
                videoElements.push({key: `day-rain-${scene.id}`, src: scene.sources.day.rain.src});
            }
        }
        if (scene.sources.night) {
            if (scene.sources.night.normal) {
                videoElements.push({key: `night-normal-${scene.id}`, src: scene.sources.night.normal.src});
            }
            if (scene.sources.night.rain) {
                videoElements.push({key: `night-rain-${scene.id}`, src: scene.sources.night.rain.src});
            }
        }
    }

    return (
        <>
            {videoElements.map(({key, src}) => (
                <VideoElement key={key} src={src}/>
            ))}
        </>
    );
};

export default VideoElements;

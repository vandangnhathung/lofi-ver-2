import React from 'react';
import {SceneProps} from "@/components/Scene/Type";
import VideoElement from "@/components/VideoElements/VideoElement";

const VideoElements: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const videoElements = [
        {key: `day-normal-${scene.id}`, src: scene.sources.day.normal.src},
        {key: `day-rain-${scene.id}`, src: scene.sources.day.rain?.src},
        {key: `night-normal-${scene.id}`, src: scene.sources.night.normal.src},
        {key: `night-rain-${scene.id}`, src: scene.sources.night.rain?.src},
    ].filter(({src}) => src !== undefined)
        .map(({key, src}) => <VideoElement key={key} src={src}/>);

    return <>{videoElements}</>;
};

export default VideoElements;

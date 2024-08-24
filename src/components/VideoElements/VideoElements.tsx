import React, {useEffect, useState} from 'react';
import {SceneProps} from "@/components/Scene/Type";
import VideoElement from "@/components/VideoElements/VideoElement";

const VideoElements: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const [videoElements, setVideoElements] = useState<{ key: string, src: string }[]>([]);

    useEffect(() => {
        const elements = [];

        if ('sources' in scene && scene.sources) {
            if (scene.sources.day) {
                if (scene.sources.day.normal) {
                    elements.push({key: `day-normal-${scene.id}`, src: scene.sources.day.normal.src});
                }
                if (scene.sources.day.rain) {
                    elements.push({key: `day-rain-${scene.id}`, src: scene.sources.day.rain.src});
                }
            }
            if (scene.sources.night) {
                if (scene.sources.night.normal) {
                    elements.push({key: `night-normal-${scene.id}`, src: scene.sources.night.normal.src});
                }
                if (scene.sources.night.rain) {
                    elements.push({key: `night-rain-${scene.id}`, src: scene.sources.night.rain.src});
                }
            }
        }

        setVideoElements(elements);
    }, [scene]); // Added `scene` as a dependency to re-run the effect if `scene` changes

    return (
        <>
            {videoElements.map(({key, src}) => (
                <VideoElement key={key} src={src}/>
            ))}
        </>
    );
};

export default VideoElements;

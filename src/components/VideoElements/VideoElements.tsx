import React from 'react';
import {SceneProps} from "@/components/Scene/Type";

const VideoElements: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const videoElements: JSX.Element[] = [];

    // Add video for normal day source
    if (scene.sources.day.normal.src) {
        videoElements.push(
            <video
                key={`day-normal-${scene.id}`}
                src={`/public/assets/videos/${scene.sources.day.normal.src}`}
                autoPlay loop muted className="object-cover inset-0 absolute"
            />
        );
    }

    // Add video for rain day source
    if (scene.sources.day.rain?.src) {
        videoElements.push(
            <video
                key={`day-rain-${scene.id}`}
                src={`/public/assets/videos/${scene.sources.day.rain.src}`}
                autoPlay loop muted className="object-cover inset-0 absolute"
            />
        );
    }

    // Add video for normal night source
    if (scene.sources.night.normal.src) {
        videoElements.push(
            <video
                key={`night-normal-${scene.id}`}
                src={`/public/assets/videos/${scene.sources.night.normal.src}`}
                autoPlay loop muted className="object-cover inset-0 absolute"
            />
        );
    }

    // Add video for rain night source
    if (scene.sources.night.rain?.src) {
        videoElements.push(
            <video
                key={`night-rain-${scene.id}`}
                src={`/public/assets/videos/${scene.sources.night.rain.src}`}
                autoPlay loop muted className="object-cover inset-0 absolute"
            />
        );
    }

    return <>{videoElements}</>;
};

export default VideoElements;

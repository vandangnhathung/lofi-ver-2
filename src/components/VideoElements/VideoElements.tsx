import React, {useEffect} from 'react';
import {SceneProps} from "@/components/Scene/Type";
import VideoElement from "@/components/VideoElements/VideoElement";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {setActiveSceneSrc} from "@/redux/reducers/sceneSlice";

const VideoElements: React.FC<{ scene: SceneProps }> = ({scene}) => {


    const activeSceneSrc = useSelector((state: RootState) => state.scene.activeSceneSrc);
    console.log("activeSceneSrc: ", activeSceneSrc);

    const videoElements = [
        {key: `day-normal-${scene.id}`, src: scene.sources.day.normal.src},
        {key: `day-rain-${scene.id}`, src: scene.sources.day.rain?.src},
        {key: `night-normal-${scene.id}`, src: scene.sources.night.normal.src},
        {key: `night-rain-${scene.id}`, src: scene.sources.night.rain?.src},
    ].filter(({src}) => src !== undefined)
        .map(({key, src}) => <VideoElement key={key} src={src} scene={scene}/>);

    return <>{videoElements}</>;
};

export default VideoElements;

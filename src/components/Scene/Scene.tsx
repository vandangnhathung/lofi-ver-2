import React from 'react';
import {SceneProps} from "@/components/Scene/Type";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import SceneButtons from "@/components/Scene/SceneButtons/SceneButtons";
import VideoElements from "@/components/VideoElements/VideoElements";

const Scene: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const nightMode = useSelector((state: RootState) => state.mode.nightMode);
    const rainMode = useSelector((state: RootState) => state.mode.rainMode);
    const chosenThemeObject = useSelector((state: RootState) => state.chosenTheme.chosenThemeObject);

    const videoElements = chosenThemeObject?.scenes.map(scene => (
        <React.Fragment key={scene.id}>
            <VideoElements scene={scene}/>
        </React.Fragment>
    ));

    return (
        <div className="absolute overflow-hidden inset-0 z-10">
            {videoElements}
            <SceneButtons buttons={scene.buttons}/>
        </div>
    );
};

export default Scene;

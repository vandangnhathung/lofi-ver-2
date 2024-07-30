import React from 'react';
import {SceneProps} from "@/components/Scene/Type";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import SceneButtons from "@/components/Scene/SceneButtons/SceneButtons";

const Scene: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const nightMode = useSelector((state: RootState) => state.mode.nightMode);
    const rainMode = useSelector((state: RootState) => state.mode.rainMode);

    return (
        <div className="absolute overflow-hidden inset-0 z-10">
            <video src={`/public/assets/videos/${scene.sources.day.normal.src}`}
                   autoPlay loop muted className="object-cover inset-0 absolute"/>
            <SceneButtons buttons={scene.buttons}/>
        </div>
    );
};

export default Scene;

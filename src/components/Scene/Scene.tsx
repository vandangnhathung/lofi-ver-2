// components/Scene/Scene.tsx
import React from 'react';
import {SceneProps} from "@/components/Panel/Type";

const Scene: React.FC<{ scene: SceneProps }> = ({scene}) => {
    return (
        <div className={`absolute overflow-hidden inset-0 z-10`}>


            <video src={`/public/assets/videos/${scene.src}`} autoPlay loop muted
                   className="object-cover h-full w-full"/>
        </div>
    );
};

export default Scene;

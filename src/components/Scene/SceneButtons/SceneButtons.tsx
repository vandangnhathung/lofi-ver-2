import React from 'react';
import SceneButton from "@/components/Scene/SceneButtons/SceneButton";

const SceneButtons = () => {
    return (
        <div className={`absolute inset-0 bg-black`}>
            <SceneButton/>
        </div>
    );
};

export default SceneButtons;
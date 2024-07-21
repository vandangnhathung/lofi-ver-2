import React, {useState} from 'react';
import MenuButton from "@/components/MenuButton/MenuButton";
import {Images} from "lucide-react";
import scenes from "@/assets/data/scenes.json";

const SwitchScene = () => {
    const [openPanel, setOpenPanel] = useState(false);

    const handleSwitchScene = () => {
        setOpenPanel(!openPanel);
    }

    return (
        <>
            <MenuButton onClick={handleSwitchScene} IconComponent={Images}/>

            {openPanel && (
                <div className="absolute bottom-lofi-panel-position text-white">
                    <div className="max-w-[750px] bg-black p-3 pt-2 rounded-xl">
                        <div
                            className="title transition-all hover:text-primary py-2 items-center inline-flex gap-x-2 cursor-pointer">
                            <span className="switch-scene">Scenes</span>
                        </div>
                        <div className="content flex flex-nowrap overflow-x-auto gap-x-4">
                            {scenes.map((scene, index) => (
                                <div key={index} className="scene flex-shrink-0 w-1/2 rounded-md">
                                    <img className="icon w-full h-full object-cover"
                                         src={`/assets/images/thumbnails/${scene.path}`}
                                         alt={`Scene ${index + 1}`}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SwitchScene;

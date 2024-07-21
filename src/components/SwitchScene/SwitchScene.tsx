import React, {useState} from 'react';
import MenuButton from "@/components/MenuButton/MenuButton";
import {Images} from "lucide-react";
import scenes from "@/assets/data/scenes.json";
import "@/components/SwitchScene/SwitchScene.scss";
// Temporarily
import "@/components/Panel/Panel.scss";
import SliderCustom from "@/components/SliderCustom/SliderCustom";


const SwitchScene = () => {
    const [openPanel, setOpenPanel] = useState(false);

    const handleSwitchScene = () => {
        setOpenPanel(!openPanel);
    }

    return (
        <>
            <MenuButton onClick={handleSwitchScene} IconComponent={Images}/>

            {openPanel && (
                <div className="panel absolute bottom-lofi-panel-position text-white">
                    <div className="panel-inner bg-black rounded-xl">
                        <div className="switch-scene">
                            <div
                                className="switch-scene__title transition-all hover:text-primary py-2 items-center inline-flex gap-x-2 cursor-pointer">
                                {/*<span className="icon"><ChevronLeft className={w-5 aspect-square}/></span>*/}
                                <span className="">Scenes</span>
                            </div>
                            <SliderCustom className="switch-scene__list">
                                {scenes.map((scene, index) => (
                                    <li key={index} className="switch-scene__list-item">
                                        <img
                                            src={`/assets/images/thumbnails/${scene.path}`}
                                            alt={`Scene ${index + 1}`}/>
                                    </li>
                                ))}
                            </SliderCustom>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SwitchScene;

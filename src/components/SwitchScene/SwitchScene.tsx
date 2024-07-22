import React, {useState} from 'react';
import MenuButton from "@/components/MenuButton/MenuButton";
import {Images} from "lucide-react";
import scenes from "@/assets/data/scenes.json";
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

            <div
                className={`panel absolute bottom-lofi-panel-position text-white transition-all duration-500 ${openPanel ? 'opacity-100' : 'opacity-0'}`}>
                <div className="panel-inner bg-black rounded-xl">
                    <div className="switch-scene">
                        <div
                            className="switch-scene__title transition-all hover:text-primary py-2 pl-[10px] items-center inline-flex gap-x-2 cursor-pointer">
                            {/*<span className="icon"><ChevronLeft className={w-5 aspect-square}/></span>*/}
                            <span className="">Scenes</span>
                        </div>
                        <SliderCustom className="">
                            {scenes.map((scene, index) => (
                                <li key={index} className="!block rounded-md overflow-hidden">
                                    <img
                                        className={`object-cover`}
                                        src={`/assets/images/thumbnails/${scene.path}`}
                                        alt={`Scene ${index + 1}`}/>
                                </li>
                            ))}
                        </SliderCustom>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SwitchScene;

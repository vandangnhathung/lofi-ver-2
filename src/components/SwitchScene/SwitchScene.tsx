import React, {useEffect, useRef, useState} from 'react';
import MenuButton from "@/components/MenuButton/MenuButton";
import {Images} from "lucide-react";
import scenes from "@/assets/data/scenes.json";
import "@/components/Panel/Panel.scss";
import SliderCustom from "@/components/SliderCustom/SliderCustom";
import PanelScene from "@/components/Panel/PanelScene";
import {isChildOfElement} from "@/helpers";

const SwitchScene = () => {
    const [openPanel, setOpenPanel] = useState(false);
    const sceneButtonRef = useRef<HTMLButtonElement>(null);

    const handleSwitchScene = () => {
        setOpenPanel(!openPanel);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const child = e.target as HTMLElement; // Casting e.target to HTMLElement
            if (!sceneButtonRef.current?.contains(child) && !isChildOfElement(child, 'panel')) {
                setOpenPanel(false);
            }
        };

        if (openPanel) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [openPanel]);

    return (
        <>
            <MenuButton ref={sceneButtonRef} onClick={handleSwitchScene} IconComponent={Images}/>

            <div
                className={`panel absolute bottom-lofi-panel-position text-white transition-all duration-500 ${openPanel ? 'opacity-100' : 'opacity-0 invisible'}`}>
                <div className="panel-inner bg-black rounded-xl">
                    <div className="switch-scene">
                        <div
                            className="switch-scene__title transition-all hover:text-primary py-2 pl-[10px] items-center inline-flex gap-x-2 cursor-pointer">
                            <span className="">Scenes</span>
                        </div>
                        <SliderCustom className="">
                            {scenes.map((scene, index) => (
                                <PanelScene index={index} path={scene.path} key={index}/>
                            ))}
                        </SliderCustom>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SwitchScene;

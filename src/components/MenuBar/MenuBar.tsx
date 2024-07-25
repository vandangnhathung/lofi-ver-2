import React from 'react';
import AudioControlButtons from "@/components/AudioControlButtons/AudioControlButtons";
import SwitchSceneButton from "@/components/SwitchSceneButton/SwitchSceneButton";
import ToggleDayNight from "@/components/ToggleDayNight/ToggleDayNight";

const MenuBar = () => {
    return (
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-gap-container`}>
            <div
                className={`flex items-center justify-between w-screen max-w-[1440px] p-2 rounded-xl h-lofi-menu-height after:content-normal backdrop-blur-md bg-[rgba(0,0,0,0.6)] `}>
                <ToggleDayNight/>
                <div
                    className={`flex items-center justify-center gap-3`}>
                    <AudioControlButtons/>
                    <SwitchSceneButton/>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;

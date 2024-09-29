import React from 'react';
import AudioControlButtons from "@/components/AudioControlButtons/AudioControlButtons";
import SwitchSceneButton from "@/components/SwitchSceneButton/SwitchSceneButton";
import ToggleDayNight from "@/components/ToggleDayNight/ToggleDayNight";
import ControlBar from "@/components/ControlBar/ControlBar";

const MenuBar = () => {
    return (
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-gap-container`}>
            <div
                className={`flex relative items-center  border border-[rgba(255,255,255,0.3)] justify-between w-screen-padding max-w-[1440px] p-2 rounded-xl h-lofi-menu-height before:content-normal after:content-normal backdrop-blur-md bg-[rgba(0,0,0,0.6)] `}>

                <div className={`absolute top-1/2 -translate-y-1/2 left-gap-container`}>
                    <ToggleDayNight/>
                </div>
                <div
                    className={`flex items-center ml-[72px] justify-center gap-3 overflow-x-auto`}>
                    <AudioControlButtons/>
                    <SwitchSceneButton/>
                    <ControlBar/>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;

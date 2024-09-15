import React from 'react';
import ControlBarMenuTop from "@/components/ControlBar/ControlBarMenu/ControlBarMenuTop";
import ControlBarMenuMiddle from "@/components/ControlBar/ControlBarMenu/ControlBarMenuMiddle";
import ControlBarMenuBottom from "@/components/ControlBar/ControlBarMenu/ControlBarMenuBottom/ControlBarMenuBottom";

const ControlBarMenu = () => {
    return (
        <div className={`fixed z-20 top-gap-container capitalize left-gap-container font-medium`}>
            <div
                className={`min-w-[400px] max-w-[500px] rounded-3xl border border-[rgba(255,255,255,0.4)] aspect-square backdrop-blur-[4px] bg-[rgba(0,0,0,0.6)] text-white`}>
                <div className="gap-3 flex flex-col pt-5 px-4">
                    <ControlBarMenuTop/>
                    <ControlBarMenuMiddle/>
                    <ControlBarMenuBottom/>
                </div>
            </div>
        </div>
    );
};

export default ControlBarMenu;
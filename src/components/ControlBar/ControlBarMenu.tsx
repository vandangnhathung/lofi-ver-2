import React from 'react';
import ControlMusic from "@/components/ControlBar/kits/ControlMusic/ControlMusic";

const ControlBarMenu = () => {
    return (
        <div className={`fixed z-20 top-gap-container left-gap-container`}>
            <div
                className={`min-w-[400px] max-w-[500px] rounded-3xl border border-[rgba(255,255,255,0.4)] aspect-square backdrop-blur-[4px] bg-[rgba(0,0,0,0.6)] text-white`}>
                <div className={`pt-5 px-4`}>
                    <ControlMusic/>
                </div>
            </div>
        </div>
    );
};

export default ControlBarMenu;
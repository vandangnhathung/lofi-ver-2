import React from 'react';
import ControlMusic from "@/components/ControlBar/kits/ControlMusic/ControlMusic";

const ControlBarMenu = () => {
    return (
        <div className={`fixed z-20 top-gap-container left-gap-container font-medium`}>
            <div
                className={`min-w-[400px] max-w-[500px] rounded-3xl border border-[rgba(255,255,255,0.4)] aspect-square backdrop-blur-[4px] bg-[rgba(0,0,0,0.6)] text-white`}>
                <div className={`flex gap-3 pt-5 px-4`}>
                    <div className={`w-2/3`}>
                        <ControlMusic/>
                    </div>

                    {/* lofi & spotify section */}
                    <div className="w-1/3">
                        <div className={`flex gap-3 flex-col h-full`}>
                            <div
                                className={`border border-[rgba(255,255,255,0.4)] rounded-xl bg-[rgba(255,255,255,0.3)]  backdrop-blur-[4px] h-[50%] ta-center flex items-center justify-center  `}>
                                lofi.co
                            </div>
                            <div
                                className={`border border-[rgba(255,255,255,0.4)] rounded-xl bg-[rgba(255,255,255,0.3)]  backdrop-blur-[4px] h-[50%] ta-center flex items-center justify-center  `}>
                                spotify
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlBarMenu;
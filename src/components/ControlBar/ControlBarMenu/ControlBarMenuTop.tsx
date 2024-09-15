import React from 'react';
import ControlMusic from "@/components/ControlBar/kits/ControlMusic/ControlMusic";

const ControlBarMenuTop = () => {
    return (
        <div className={`flex gap-3`}>
            <div className={`w-[65%]`}>
                <ControlMusic/>
            </div>

            {/* lofi & spotify section */}
            <div className="w-[35%]">
                <div className={`flex gap-3 flex-col h-full`}>
                    <div
                        className={`border border-[rgba(255,255,255,0.4)] p-2 rounded-xl bg-[rgba(255,255,255,0.3)]  backdrop-blur-[4px] h-[50%] ta-center flex items-center justify-center  `}>
                        lofi.co
                    </div>
                    <div
                        className={`flex gap-2  items-center justify-center border border-[rgba(255,255,255,0.4)] p-2 rounded-xl bg-[rgba(255,255,255,0.3)]  backdrop-blur-[4px] h-[50%]`}>
                        <div
                            className={`w-[30px] ta-center grayscale aspect-square before:content-normal before:absolute before:inset-0 before:rounded-full before:bg-black before:opacity-10 relative`}>
                            <img className={`w-full h-full object-contain`}
                                 src="../../../../public/assets/icons/spotify-logo.png" alt=""/>
                        </div>
                        <p className={``}>
                            spotify
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlBarMenuTop;
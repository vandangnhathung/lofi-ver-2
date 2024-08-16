import React from 'react';
import {Guitar} from "lucide-react";
import ControlMusicList from "@/components/ControlBar/kits/ControlMusic/ControlMusicList";

const ControlMusic = () => {
    const array = [1, 2, 3, 4]
    array.forEach(n => console.log(n + 1));


    return (
        <div
            className={`flex flex-col gap-4 p-2 border border-[rgba(255,255,255,0.4)] rounded-xl bg-[rgba(255,255,255,0.3)] backdrop-blur-[10px]`}>
            <div className={`flex justify-between gap-x-2`}>
                <p className={`uppercase`}>music</p>
                <Guitar/>
            </div>
            <div className={`flex`}>
                <div className={`w-2/3`}>
                    <ControlMusicList/>
                </div>
                <div className="w-1/3">
                    lofi.co & spotify
                </div>
            </div>
        </div>
    );
};

export default ControlMusic;
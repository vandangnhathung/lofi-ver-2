import React from 'react';
import {Guitar} from "lucide-react";
import ControlMusicList from "@/components/ControlBar/kits/ControlMusic/ControlMusicList";

const ControlMusic = () => {
    return (
        <div className={`flex flex-col gap-4`}>
            <div className={`flex justify-between gap-x-2`}>
                <p className={`uppercase`}>music</p>
                <Guitar/>
            </div>
            <ControlMusicList/>
        </div>
    );
};

export default ControlMusic;
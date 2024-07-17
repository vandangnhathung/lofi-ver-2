import React from 'react';
import PlayMusicButtons from "../PlayMusic/PlayMusicButtons";

const MenuBar = () => {
    return (
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-gap-container`}>
            <div
                className={`w-screen max-w-[1440px] p-2 rounded-xl h-[60px] backdrop-blur-md bg-[rgba(0,0,0,0.6)] flex items-center justify-center gap-3`}>
                <PlayMusicButtons/>
            </div>
        </div>
    );
};

export default MenuBar;

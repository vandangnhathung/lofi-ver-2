import React from 'react';
import musics from "@/assets/data/musics.json";
import MenuButton from "../MenuButton/MenuButton";
import {CirclePause, CirclePlay, SkipBack, SkipForward} from "lucide-react";

const PlayMusicButtons: React.FC = () => {
    const [isPlay, setIsPlay] = React.useState<boolean>(false);

    const handlePlayMusic = () => {
        setIsPlay(prevState => !prevState);
    }

    const renderPlayPauseButton = () => (
        isPlay
            ? <MenuButton onClick={handlePlayMusic} IconComponent={CirclePause}/>
            : <MenuButton onClick={handlePlayMusic} IconComponent={CirclePlay}/>
    );

    return (
        <>
            <MenuButton IconComponent={SkipBack}/>
            {renderPlayPauseButton()}
            <MenuButton IconComponent={SkipForward}/>
        </>
    );
};

export default PlayMusicButtons;

import React, {useRef} from 'react';
import jazzy1 from "@/assets/musics/jazzy_1.mp3"
import MenuButton from "@/components/MenuButton/MenuButton";
import {CirclePause, CirclePlay, SkipBack, SkipForward} from "lucide-react";

const PlayMusicButtons: React.FC = () => {
    const [isPlay, setIsPlay] = React.useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayMusic = () => {
        if (!isPlay) {
            audioRef.current?.play();
            setIsPlay(true);
        } else {
            audioRef.current?.pause();
            setIsPlay(false);
        }

    }

    console.log(jazzy1);

    return (
        <>
            <MenuButton IconComponent={SkipBack}/>
            <MenuButton onClick={handlePlayMusic} IconComponent={isPlay ? CirclePause : CirclePlay}/>
            <MenuButton IconComponent={SkipForward}/>
            <audio ref={audioRef} loop src={jazzy1}/>
        </>
    );
};

export default PlayMusicButtons;

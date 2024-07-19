import React, {useEffect, useRef, useState} from 'react';
import musics from "@/assets/data/musics.json";
import MenuButton from "@/components/MenuButton/MenuButton";
import {CirclePause, CirclePlay, SkipBack, SkipForward} from "lucide-react";

const PlayMusicButtons: React.FC = () => {
    const [isPlay, setIsPlay] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [musicIndex, setMusicIndex] = useState<number>(Math.floor(Math.random() * musics.length));
    const [currentMusicObject, setCurrentMusicObject] = useState(musics[musicIndex]);

    useEffect(() => {
        if (isPlay) {
            audioRef.current?.play();
        }
    }, [currentMusicObject, isPlay]);

    const handlePlaySong = () => {
        if (!isPlay) {
            audioRef.current?.play();
            setIsPlay(true);
        } else {
            audioRef.current?.pause();
            setIsPlay(false);
        }
    };

    const handleNextSong = () => {
        let nextIndex = musicIndex + 1;
        if (nextIndex >= musics.length) {
            nextIndex = 0;
        }
        setMusicIndex(nextIndex);
        setCurrentMusicObject(musics[nextIndex]);
        setIsPlay(true);
    };

    console.log(`/assets/musics/${currentMusicObject.path}`);
    return (
        <>
            <MenuButton IconComponent={SkipBack}/>
            <MenuButton onClick={handlePlaySong} IconComponent={isPlay ? CirclePause : CirclePlay}/>
            <MenuButton onClick={handleNextSong} IconComponent={SkipForward}/>
            <audio ref={audioRef} loop src={`/assets/musics/${currentMusicObject.path}`}/>
        </>
    );
};

export default PlayMusicButtons;

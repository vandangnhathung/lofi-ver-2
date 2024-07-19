import React, {useEffect, useRef, useState} from 'react';
import musics from "@/assets/data/musics.json";
import MenuButton from "@/components/MenuButton/MenuButton";
import {CirclePause, CirclePlay, SkipBack, SkipForward} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {setIsPlay} from "@/redux/reducers/playerMusicSlice";

const PlayMusicButtons: React.FC = () => {
    const isPlay = useSelector((state: RootState) => state.playerMusic.isPlay);
    const dispatch = useDispatch();
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
            dispatch(setIsPlay(true));
        } else {
            audioRef.current?.pause();
            dispatch(setIsPlay(false));
        }
    };

    const handleNextSong = () => {
        let nextIndex = musicIndex + 1;
        if (nextIndex >= musics.length) {
            nextIndex = 0;
        }
        setMusicIndex(nextIndex);
        setCurrentMusicObject(musics[nextIndex]);
        dispatch(setIsPlay(true));
    };

    const handlePrevSong = () => {
        let prevIndex = musicIndex - 1;
        if (prevIndex < 0) {
            prevIndex = musics.length - 1;
        }
        setMusicIndex(prevIndex);
        setCurrentMusicObject(musics[prevIndex]);
        dispatch(setIsPlay(true));
    }

    return (
        <>
            <MenuButton onClick={handlePrevSong} IconComponent={SkipBack}/>
            <MenuButton onClick={handlePlaySong} IconComponent={isPlay ? CirclePause : CirclePlay}/>
            <MenuButton onClick={handleNextSong} IconComponent={SkipForward}/>
            <audio ref={audioRef} loop src={`/assets/musics/${currentMusicObject.path}`}/>
        </>
    );
};

export default PlayMusicButtons;

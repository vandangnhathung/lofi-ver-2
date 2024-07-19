import React, {useEffect, useRef} from 'react';
import MenuButton from "@/components/MenuButton/MenuButton";
import {CirclePause, CirclePlay, SkipBack, SkipForward} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {playNextSong, playPrevSong, playSong} from "@/redux/reducers/playerMusicSlice";

const PlayMusicButtons: React.FC = () => {
    const isPlay = useSelector((state: RootState) => state.playerMusic.isPlay);
    const currentSong = useSelector((state: RootState) => state.playerMusic.currentSong);
    const dispatch = useDispatch();
    const audioRef = useRef<HTMLAudioElement>(null);

    // After state is updated (executed by next & prev song function) => make sure audio is played
    useEffect(() => {
        if (isPlay) {
            audioRef.current?.play();
        }
    }, [currentSong, isPlay]);

    const handlePlaySong = () => {
        if (audioRef.current) {
            dispatch(playSong(audioRef.current));
        }
    };

    return (
        <>
            <MenuButton onClick={() => dispatch(playPrevSong())} IconComponent={SkipBack}/>
            <MenuButton onClick={handlePlaySong} IconComponent={isPlay ? CirclePause : CirclePlay}/>
            <MenuButton onClick={() => dispatch(playNextSong())} IconComponent={SkipForward}/>
            <audio ref={audioRef} loop src={`/assets/musics/${currentSong.path}`}/>
        </>
    );
};

export default PlayMusicButtons;

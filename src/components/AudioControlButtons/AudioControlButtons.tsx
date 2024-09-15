import React from 'react';
import MenuButton from "@/components/MenuButton/MenuButton";
import {CirclePause, CirclePlay, SkipBack, SkipForward} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {pause, play, playNextSong, playPrevSong} from "@/redux/reducers/playerMusicSlice";

const AudioControlButtons: React.FC = () => {
    const isPlay = useSelector((state: RootState) => state.playerMusic.isPlay);
    const currentSong = useSelector((state: RootState) => state.playerMusic.currentSong);
    const dispatch = useDispatch();

    const handlePlaySong = () => {
        if (!isPlay) {
            dispatch(play());
        } else {
            dispatch(pause());
        }
    };

    return (
        <>
            <MenuButton onClick={() => dispatch(playPrevSong(currentSong.category[0]))} IconComponent={SkipBack}/>
            <MenuButton onClick={handlePlaySong} IconComponent={isPlay ? CirclePause : CirclePlay}/>
            <MenuButton onClick={() => dispatch(playNextSong(currentSong.category[0]))} IconComponent={SkipForward}/>
        </>
    );
};

export default AudioControlButtons;

import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const ControlMusicList = () => {
    const musics = useSelector((state: RootState) => state.playerMusic.musics);
    const categorizedMusics = useSelector((state: RootState) => state.playerMusic.categorizedMusics);

    return (
        <div className="flex justify-between">
        </div>
    );
};

export default ControlMusicList;

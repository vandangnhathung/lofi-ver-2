import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const AudioPlayer: React.FC = () => {
    const isPlay = useSelector((state: RootState) => state.playerMusic.isPlay);
    const currentSong = useSelector((state: RootState) => state.playerMusic.currentSong);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (isPlay) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlay, currentSong]);

    return (
        <audio ref={audioRef} loop src={`/assets/musics/${currentSong.path}`}/>
    );
};

export default React.memo(AudioPlayer);
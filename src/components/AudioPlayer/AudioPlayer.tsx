import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const AudioPlayer: React.FC = () => {
    const isPlay = useSelector((state: RootState) => state.playerMusic.isPlay);
    const currentSong = useSelector((state: RootState) => state.playerMusic.currentSong);
    const audioRef = useRef<HTMLAudioElement>(null);
    const volume = useSelector((state: RootState) => state.playerMusic.volume);


    console.log(audioRef.current?.volume);

    useEffect(() => {
        if (isPlay) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlay, currentSong]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
        console.log(volume)
    }, [volume]);

    return (
        <audio ref={audioRef} loop src={`/assets/musics/${currentSong.path}`}/>
    );
};

export default React.memo(AudioPlayer);
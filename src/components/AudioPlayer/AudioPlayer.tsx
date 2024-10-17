import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {playNextSong} from "@/redux/reducers/playerMusicSlice";

const AudioPlayer: React.FC = () => {
    const isPlay = useSelector((state: RootState) => state.playerMusic.isPlay);
    const currentSong = useSelector((state: RootState) => state.playerMusic.currentSong);
    const volume = useSelector((state: RootState) => state.playerMusic.volume);
    const audioRef = useRef<HTMLAudioElement>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (isPlay) {
            audioRef.current?.play();
        } else {
            audioRef.current?.pause();
        }
    }, [isPlay, currentSong]);

    useEffect(() => {
        const handleEnded = () => {
            dispatch(playNextSong(currentSong.category[0])); // Change "jazzy" to your category if needed
        };

        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener("ended", handleEnded);
        }

        return () => {
            if (audioElement) {
                audioElement.removeEventListener("ended", handleEnded);
            }
        };
    }, [dispatch]);

    // console.log("AudioPlayer rendered", currentSong);

    return (
        <audio ref={audioRef} src={`@/assets/musics/${currentSong.path}`}/>
    );
};

export default React.memo(AudioPlayer);

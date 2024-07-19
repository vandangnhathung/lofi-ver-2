import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import musics from "@/assets/data/musics.json";

const RANDOM_MUSIC_INDEX = Math.floor(Math.random() * musics.length);

export interface PlayerMusicState {
    musicIndex: number;
    currentSong: any;
    isPlay: boolean;
}

const initialState: PlayerMusicState = {
    musicIndex: RANDOM_MUSIC_INDEX,
    currentSong: musics[RANDOM_MUSIC_INDEX],
    isPlay: false,
};

const playerMusicSlice = createSlice({
    name: "playerMusic",
    initialState,
    reducers: {
        setCurrentSong: (state, action: PayloadAction<any>) => {
            state.currentSong = action.payload;
        },
        setIsPlay: (state, action: PayloadAction<boolean>) => {
            state.isPlay = action.payload;
        },
        setMusicIndex: (state, action: PayloadAction<number>) => {
            state.musicIndex = action.payload;
        },
        playSong: (state, action: PayloadAction<HTMLAudioElement>) => {
            if (!state.isPlay) {
                action.payload.play();
                state.isPlay = true;
            } else {
                action.payload.pause();
                state.isPlay = false;
            }
        },
        playNextSong: (state) => {
            let nextIndex = state.musicIndex + 1;
            if (nextIndex >= musics.length) {
                nextIndex = 0;
            }
            state.musicIndex = nextIndex;
            state.currentSong = musics[nextIndex];
            state.isPlay = true;
        },
        playPrevSong: (state) => {
            let prevIndex = state.musicIndex - 1;
            if (prevIndex < 0) {
                prevIndex = musics.length - 1;
            }
            state.musicIndex = prevIndex;
            state.currentSong = musics[prevIndex];
            state.isPlay = true;
        }
    },
});

export const {
    setCurrentSong,
    playSong,
    setIsPlay,
    setMusicIndex,
    playNextSong,
    playPrevSong
} = playerMusicSlice.actions;
export default playerMusicSlice.reducer;

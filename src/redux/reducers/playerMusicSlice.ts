import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import musics from "@/assets/data/musics.json";
import {PlayerMusicState, Song} from "@/components/AudioControlButtons/Type";

// Function to categorize music based on categories in JSON
const categorizeMusics = (musics: Song[]) => {
    return musics.reduce((acc, music) => {
        if (!acc[music.category]) {
            acc[music.category] = [];
        }
        acc[music.category].push(music);
        return acc;
    }, {} as { [key: string]: Song[] });
};

const RANDOM_MUSIC_INDEX = Math.floor(Math.random() * musics.length);

// Categorize musics dynamically
const categorizedMusics = categorizeMusics(musics);

const initialState: PlayerMusicState = {
    musics: musics,
    categorizedMusics: categorizedMusics,  // Store categorized musics
    musicIndex: RANDOM_MUSIC_INDEX,
    currentSong: musics[RANDOM_MUSIC_INDEX],
    isPlay: false,
};

const playerMusicSlice = createSlice({
    name: "playerMusic",
    initialState,
    reducers: {
        setCurrentSong: (state, action: PayloadAction<Song>) => {
            state.currentSong = action.payload;
        },
        setIsPlay: (state, action: PayloadAction<boolean>) => {
            state.isPlay = action.payload;
        },
        play: (state) => {
            state.isPlay = true;
        },
        pause: (state) => {
            state.isPlay = false;
        },
        setMusicIndex: (state, action: PayloadAction<number>) => {
            state.musicIndex = action.payload;
            state.currentSong = state.musics[state.musicIndex];
        },
        playNextSong: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            const categoryMusics = state.categorizedMusics[category];
            let nextIndex = state.musicIndex + 1;
            if (nextIndex >= categoryMusics.length) {
                nextIndex = 0;
            }
            state.musicIndex = nextIndex;
            state.currentSong = categoryMusics[nextIndex];
            state.isPlay = true;
        },
        playPrevSong: (state, action: PayloadAction<string>) => {
            const category = action.payload;
            const categoryMusics = state.categorizedMusics[category];
            let prevIndex = state.musicIndex - 1;
            if (prevIndex < 0) {
                prevIndex = categoryMusics.length - 1;
            }
            state.musicIndex = prevIndex;
            state.currentSong = categoryMusics[prevIndex];
            state.isPlay = true;
        }
    },
});

export const {
    play,
    pause,
    setIsPlay,
    setMusicIndex,
    playNextSong,
    playPrevSong
} = playerMusicSlice.actions;

export default playerMusicSlice.reducer;

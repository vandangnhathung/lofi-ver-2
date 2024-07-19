import {createSlice} from "@reduxjs/toolkit";

export interface PlayerMusicState {
    currentSong: any;
    isPlay: boolean;
}

const initialState: PlayerMusicState = {
    currentSong: null,
    isPlay: false,
};

const playerMusicSlice = createSlice({
    name: "playerMusic",
    initialState,
    reducers: {
        setCurrentSong: (state, action) => {
            state.currentSong = action.payload;
        },
        setIsPlay: (state, action) => {
            state.isPlay = action.payload;
        },
    },
})

export const {setCurrentSong, setIsPlay} = playerMusicSlice.actions;
export default playerMusicSlice.reducer;
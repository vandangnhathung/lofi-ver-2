import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface SceneState {
    nightMode: boolean;
    rainMode: boolean;
}

const initialState: SceneState = {
    nightMode: false,
    rainMode: false,
};

const modeSlice = createSlice({
    name: "scene",
    initialState,
    reducers: {
        setNightMode: (state, action: PayloadAction<boolean>) => {
            state.nightMode = action.payload;
        },
        setRainMode: (state, action: PayloadAction<boolean>) => {
            state.rainMode = action.payload;
        }
    },
});

export const {
    setNightMode,
    setRainMode,
} = modeSlice.actions;

export default modeSlice.reducer;

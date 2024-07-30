import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import themesData from "@/assets/data/themesCopy.json";
import {SceneProps} from "@/components/Scene/Type";

interface SceneState {
    scene: SceneProps;
    activeScene: SceneProps;
    previousScene: SceneProps;
    nightMode: boolean;
    rainMode: boolean;
    animation?: "in" | "out" | 'complete';
}

const initialState: SceneState = {
    scene: themesData[0].scenes[0],
    activeScene: themesData[0].scenes[0],
    previousScene: themesData[0].scenes[0],
    nightMode: false,
    rainMode: false,
    animation: "in",
};

const sceneSlice = createSlice({
    name: "scene",
    initialState,
    reducers: {
        setScene: (state, action: PayloadAction<SceneProps>) => {
            state.scene = action.payload;
            state.animation = "in";
        },
        setAnimation: (state, action: PayloadAction<"in" | "out" | 'complete'>) => {
            state.animation = action.payload;
        },
        setNightMode: (state, action: PayloadAction<boolean>) => {
            state.nightMode = action.payload;
        },
        setRainMode: (state, action: PayloadAction<boolean>) => {
            state.rainMode = action.payload;
        },
        setActiveScene: (state, action: PayloadAction<SceneProps>) => {
            state.activeScene = action.payload;
        },
    },
});

export const {
    setScene,
    setAnimation,
    setActiveScene,
    setNightMode,
    setRainMode,
} = sceneSlice.actions;

export default sceneSlice.reducer;

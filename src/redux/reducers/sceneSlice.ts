import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import themesData from "@/assets/data/themesCopy.json";
import {SceneProps} from "@/components/Scene/Type";

interface SceneState {
    scene: SceneProps;
    activeScene: SceneProps;
    previousScene: SceneProps;
    activeSrc: string | undefined;
    previousSrc: string | undefined;
    nightMode: boolean;
    rainMode: boolean;
    animation?: "in" | "out" | 'complete';
    nightModeClicked: boolean;
    rainModeClicked: boolean;
}

const initialState: SceneState = {
    scene: themesData[0].scenes[0],
    activeScene: themesData[0].scenes[0],
    previousScene: themesData[0].scenes[0],
    activeSrc: themesData[0].scenes[0].sources.day.normal.src,
    previousSrc: themesData[0].scenes[0].sources.day.normal.src,
    nightMode: false,
    rainMode: false,
    animation: "in",
    nightModeClicked: false,
    rainModeClicked: false
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
        setPreviousScene: (state, action: PayloadAction<SceneProps>) => {
            state.previousScene = action.payload;
            state.activeScene = action.payload;
        },
        setActiveSceneSrc: (state, action: PayloadAction<string | undefined>) => {
            state.activeSrc = action.payload;
        },
        setPreviousSceneSrc: (state, action: PayloadAction<string | undefined>) => {
            state.previousSrc = action.payload;
        },
        setNightModeClicked: (state, action: PayloadAction<boolean>) => {
            state.nightModeClicked = action.payload;
        },
        setRainModeClicked: (state, action: PayloadAction<boolean>) => {
            state.rainModeClicked = action.payload;
        }
    },
});

export const {
    setScene,
    setAnimation,
    setActiveScene,
    setNightMode,
    setRainMode,
    setPreviousScene,
    setActiveSceneSrc,
    setPreviousSceneSrc,
    setNightModeClicked,
    setRainModeClicked
} = sceneSlice.actions;

export default sceneSlice.reducer;

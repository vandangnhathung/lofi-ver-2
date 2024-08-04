import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import themesData from "@/assets/data/themesCopy.json";
import {SceneProps} from "@/components/Scene/Type";

interface SceneState {
    scene: SceneProps;
    activeScene: SceneProps;
    activeSceneSrc: string;
    previousScene: SceneProps;
    animation?: "in" | "out" | 'complete';
}

const initialState: SceneState = {
    scene: themesData[0].scenes[0],
    activeScene: themesData[0].scenes[0],
    activeSceneSrc: themesData[0].scenes[0].sources.day.normal.src,
    previousScene: themesData[0].scenes[0],
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
        setActiveScene: (state, action: PayloadAction<SceneProps>) => {
            state.activeScene = action.payload;
        },
    },
});

export const {
    setScene,
    setAnimation,
    setActiveScene,
} = sceneSlice.actions;

export default sceneSlice.reducer;

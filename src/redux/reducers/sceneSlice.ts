import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import themesData from "@/assets/data/themes.json";
import {SceneProps} from "@/components/Scene/Type";

// Define the structure of the slice's state
interface SceneState {
    scene: SceneProps;
    activeScene: SceneProps;
    nightMode: boolean;
    animation?: "in" | "out" | 'complete';
}

const initialState: SceneState = {
    scene: themesData[0].scenes[0],
    activeScene: themesData[0].scenes[0],
    nightMode: false,
    animation: "in"
};

// Create the slice with actions to switch scenes and set loading scene
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
        setNightMode: (state, action: PayloadAction<boolean>) => {
            state.nightMode = action.payload;
            if (state.nightMode) console.log("Night mode enabled", state.nightMode);
        },
    },
});

// Export the actions and reducer
export const {setScene, setAnimation, setActiveScene, setNightMode} = sceneSlice.actions;
export default sceneSlice.reducer;

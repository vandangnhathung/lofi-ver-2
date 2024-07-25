import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import themesData from "@/assets/data/themes.json";
import {SceneProps} from "@/components/Scene/Type";

// Define the structure of the slice's state
interface SceneState {
    scene: SceneProps;
    activeScene: SceneProps;
    animation?: "in" | "out" | 'complete';
}


const initialState: SceneState = {
    scene: themesData[0].scenes[0],
    activeScene: themesData[0].scenes[0],
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
    },
});

// Export the actions and reducer
export const {setScene, setAnimation, setActiveScene} = sceneSlice.actions;
export default sceneSlice.reducer;

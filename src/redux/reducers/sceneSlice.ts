import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import scenes from "@/assets/data/scenes.json";
import {SceneProps} from "@/components/Panel/Type";

// Define the structure of the slice's state
interface SceneState {
    scene: SceneProps;
    sceneComplete: SceneProps;
    animation?: "in" | "out" | 'complete';
}

// Initialize the state with the first scene from the JSON data
const initialState: SceneState = {
    scene: scenes[0],
    sceneComplete: scenes[0],
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
        setSceneComplete: (state, action: PayloadAction<SceneProps>) => {
            state.sceneComplete = action.payload;
        },
    },
});

// Export the actions and reducer
export const {setScene, setAnimation, setSceneComplete} = sceneSlice.actions;
export default sceneSlice.reducer;

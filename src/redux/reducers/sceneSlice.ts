import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import scenes from "@/assets/data/scenes.json";
import {Scene} from "@/components/Panel/Type";


// Define the structure of the slice's state
interface SceneState {
    scene: Scene;
}

// Initialize the state with the first scene from the JSON data
const initialState: SceneState = {
    scene: scenes[0],
};

// Create the slice with an action to switch scenes
const sceneSlice = createSlice({
    name: "scene",
    initialState,
    reducers: {
        switchScene: (state, action: PayloadAction<Scene>) => {
            state.scene = action.payload;
        }
    },
});

// Export the action and reducer
export const {switchScene} = sceneSlice.actions;
export default sceneSlice.reducer;

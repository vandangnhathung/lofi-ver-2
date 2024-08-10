import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import themesData from "@/assets/data/themesCopy.json";
import {SceneProps} from "@/components/Scene/Type";

interface SceneState {
    scene: SceneProps;
    activeScene: SceneProps;
    activeSceneSrc: string | undefined;
    previousScene: SceneProps;
    animation?: "in" | "out" | "complete";
}

const initialState: SceneState = {
    scene: themesData[0].scenes[0] as SceneProps,
    activeScene: themesData[0].scenes[0] as SceneProps,
    activeSceneSrc: 'sources' in themesData[0].scenes[0]
        ? themesData[0].scenes[0].sources?.day?.normal?.src
        : typeof themesData[0].scenes[0].src === 'string'
            ? themesData[0].scenes[0].src
            : undefined,  // Handle cases where src is an object rather than a string
    previousScene: themesData[0].scenes[0] as SceneProps,
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
            console.log("change animation");
            state.animation = action.payload;
        },
        setActiveScene: (state, action: PayloadAction<SceneProps>) => {
            console.log("change scene");
            state.activeScene = action.payload;
        },
        setActiveSceneSrc(state, action: PayloadAction<string | undefined>) {
            state.activeSceneSrc = action.payload;
        }
    },
});

export const {
    setScene,
    setAnimation,
    setActiveScene,
    setActiveSceneSrc
} = sceneSlice.actions;

export default sceneSlice.reducer;

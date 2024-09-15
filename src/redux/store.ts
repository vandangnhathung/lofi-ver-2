import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import playerMusicSlice from "@/redux/reducers/playerMusicSlice";
import panelSlice from "@/redux/reducers/panelSlice";
import sceneSlice from "@/redux/reducers/sceneSlice";
import loadingSlice from "@/redux/reducers/loadingSlice";
import themeSlice from "@/redux/reducers/themeSlice";
import modeSlice from "@/redux/reducers/modeSlice";
import backgroundSoundSlice from "@/redux/reducers/BackgroundSoundSlice";


const rootReducer = combineReducers({
    playerMusic: playerMusicSlice,
    panel: panelSlice,
    scene: sceneSlice,
    loading: loadingSlice,
    themes: themeSlice,
    mode: modeSlice,
    backgroundSound: backgroundSoundSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

// Define RootState type as the return type of the store's getState function to ensure type safety, consistency, and accurate state structure.
export type RootState = ReturnType<typeof store.getState>;



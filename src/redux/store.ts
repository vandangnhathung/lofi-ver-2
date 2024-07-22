import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import playerMusicSlice from "@/redux/reducers/playerMusicSlice";
import panelSlice from "@/redux/reducers/panelSlice";


const rootReducer = combineReducers({
    playerMusic: playerMusicSlice,
    panel: panelSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

// Define RootState type as the return type of the store's getState function to ensure type safety, consistency, and accurate state structure.
export type RootState = ReturnType<typeof store.getState>;



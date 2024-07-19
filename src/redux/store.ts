import {configureStore} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import playerMusicSlice from "@/redux/reducers/playerMusicSlice";


const rootReducer = combineReducers({
    playerMusic: playerMusicSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;



// redux/reducers/BackgroundSound.ts
import {createSlice} from '@reduxjs/toolkit';

interface Volumes {
    [key: string]: number;
}

interface VolumeState {
    volumes: Volumes;
}

const initialState: VolumeState = {
    volumes: {
        rainCity: 0,
        traffic: 0,
        keyboard: 0
    }
};

const backgroundSoundSlice = createSlice({
    name: 'backgroundSound',
    initialState,
    reducers: {
        setVolume: (state, action) => {
            const {sound, volume} = action.payload;
            state.volumes[sound] = volume;
        },
        openSound: (state, action) => {
            state.volumes[action.payload] = 50;
        }
    },
});

export const {setVolume, openSound} = backgroundSoundSlice.actions;
export default backgroundSoundSlice.reducer;

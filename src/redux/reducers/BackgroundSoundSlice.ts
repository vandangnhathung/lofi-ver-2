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
        toggleSound: (state, action) => {
            if (state.volumes[action.payload] === undefined) {
                state.volumes[action.payload] = 50;
            }

            if (state.volumes[action.payload] > 0) {
                state.volumes[action.payload] = 0;
            } else state.volumes[action.payload] = 50;

            console.log(action.payload);
        }
    },
});

export const {setVolume, toggleSound} = backgroundSoundSlice.actions;
export default backgroundSoundSlice.reducer;

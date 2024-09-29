import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import backgroundSoundsData from "@/assets/data/backgroundSounds.json";

export interface BackgroundSound {
    name: string;
    src: string;
    volume: number;
}

interface VolumeState {
    allBackgroundSounds: BackgroundSound[];
    mixMore: boolean;
}


const initialState: VolumeState = {
    allBackgroundSounds: backgroundSoundsData.map((item) => ({
        ...item,
        volume: 0, // Set volume directly in the object
    })), // Use the updated backgroundSoundsData
    mixMore: false,
};

const backgroundSoundSlice = createSlice({
    name: "backgroundSound",
    initialState,
    reducers: {
        toggleMixMore: (state, action: PayloadAction<boolean>) => {
            state.mixMore = action.payload;
        },
        setVolumeSound: (state, action: PayloadAction<{ soundName: string, newVolume: number }>) => {
            const {soundName, newVolume} = action.payload;
            const sound = state.allBackgroundSounds.find(
                (sound) => sound.name === soundName
            );
            if (sound) {
                sound.volume = newVolume;
            }
        },
    },
});

export const {toggleMixMore, setVolumeSound} = backgroundSoundSlice.actions;
export default backgroundSoundSlice.reducer;

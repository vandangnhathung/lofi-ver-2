import { createSlice } from "@reduxjs/toolkit";
import backgroundSoundsData from "@/assets/data/backgroundSounds.json";

interface Volumes {
  [key: string]: number;
}

export interface BackgroundSound {
  name: string;
  src: string;
  volume?: number;
}
interface VolumeState {
  volumes: Volumes;
  backgroundSounds: BackgroundSound[];
  mixMore: boolean;
}

const initialState: VolumeState = {
  volumes: {
    rainCity: 0,
    traffic: 0,
    keyboard: 0,
  },
  backgroundSounds: backgroundSoundsData,
  mixMore: false,
};

const backgroundSoundSlice = createSlice({
  name: "backgroundSound",
  initialState,
  reducers: {
    setNewSound: (state, action) => {
      state.volumes[action.payload] = 0;
    },
    toggleSound: (state, action) => {
      if (state.volumes[action.payload] === undefined) {
        state.volumes[action.payload] = 50;
      }

      if (state.volumes[action.payload] > 0) {
        state.volumes[action.payload] = 0;
      } else state.volumes[action.payload] = 50;

      console.log(action.payload);
    },
    toggleMixMore: (state, action) => {
      state.mixMore = action.payload;
    },
  },
});

export const { setNewSound, toggleSound, toggleMixMore } =
  backgroundSoundSlice.actions;
export default backgroundSoundSlice.reducer;

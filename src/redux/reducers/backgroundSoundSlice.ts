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
  volumes: Volumes[];
  backgroundSounds: BackgroundSound[];
  mixMore: boolean;
}

const initialState: VolumeState = {
  volumes: [],
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
    setNewSounds: (state, action) => {
      state.volumes = action.payload;
    },
    toggleSound: (state, action) => {
      if (state.volumes[action.payload] === undefined) {
        state.volumes[action.payload] = 50;
      }

      if (state.volumes[action.payload] > 0) {
        state.volumes[action.payload] = 0;
      } else state.volumes[action.payload] = 50;

      console.log("action.payload", action.payload, backgroundSoundsData);
    },
    toggleMixMore: (state, action) => {
      state.mixMore = action.payload;
    },
  },
});

export const {setNewSound, setNewSounds, toggleSound, toggleMixMore} =
    backgroundSoundSlice.actions;
export default backgroundSoundSlice.reducer;

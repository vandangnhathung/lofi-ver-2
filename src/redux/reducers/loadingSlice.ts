import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// Define the structure of the slice's state
interface loadingState {
    loading: boolean;
    loadingScene: boolean;
}

// Initialize the state with the first scene from the JSON data
const initialState: loadingState = {
    loading: true,
    loadingScene: false
};

// Create the slice with actions to switch scenes and set loading scene
const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setLoadingScene: (state, action: PayloadAction<boolean>) => {
            state.loadingScene = action.payload;
        }

    },
});

// Export the actions and reducer
export const {setLoading, setLoadingScene} = loadingSlice.actions;
export default loadingSlice.reducer;

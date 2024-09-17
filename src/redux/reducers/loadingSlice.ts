// redux/reducers/loadingSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface LoadingState {
    loading: boolean;
    loadingScene: boolean;
    animationComplete: boolean;
    isButtonClicked: boolean;
}

const initialState: LoadingState = {
    loading: true,
    loadingScene: false,
    animationComplete: false,
    isButtonClicked: true,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setLoadingScene: (state, action: PayloadAction<boolean>) => {
            state.loadingScene = action.payload;
        },
        setAnimationComplete: (state, action: PayloadAction<boolean>) => {
            state.animationComplete = action.payload;
        },
        setTransitionEnd: (state, action: PayloadAction<boolean>) => {
            // console.log('setTransitionEnd', action.payload);
            state.isButtonClicked = action.payload;
        }
    },
});

export const {setLoading, setLoadingScene, setAnimationComplete, setTransitionEnd} = loadingSlice.actions;
export default loadingSlice.reducer;

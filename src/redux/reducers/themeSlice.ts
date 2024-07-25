import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeProps} from '@/components/Scene/Type';

interface ChosenThemeState {
    chosenThemeObject: ThemeProps | null;
    isChosenTheme: boolean;
}

const initialState: ChosenThemeState = {
    chosenThemeObject: null,
    isChosenTheme: false,
};

const chosenThemeSlice = createSlice({
    name: 'chosenTheme',
    initialState,
    reducers: {
        setChosenTheme: (state, action: PayloadAction<ThemeProps>) => {
            state.chosenThemeObject = action.payload;
            state.isChosenTheme = true;
        },
        goBackToThemePanel: (state) => {
            state.chosenThemeObject = null;
            state.isChosenTheme = false;
        },
    },
});

export const {setChosenTheme, goBackToThemePanel} = chosenThemeSlice.actions;
export default chosenThemeSlice.reducer;

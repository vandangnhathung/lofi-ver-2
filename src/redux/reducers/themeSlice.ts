import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ThemeProps} from '@/components/Scene/Type';
import themesData from "@/assets/data/themesCopy.json";

interface ChosenThemeState {
    themes: ThemeProps[];
    chosenThemeObject: ThemeProps | null;
    chosenThemeObjectPanel: ThemeProps | null;
    isChosenTheme: boolean;
}

const initialState: ChosenThemeState = {
    themes: themesData,
    chosenThemeObject: themesData[0],
    chosenThemeObjectPanel: themesData[0],
    isChosenTheme: false,
};

const chosenThemeSlice = createSlice({
    name: 'chosenTheme',
    initialState,
    reducers: {
        setChosenThemePanel: (state, action: PayloadAction<ThemeProps>) => {
            state.chosenThemeObjectPanel = action.payload;
            state.isChosenTheme = true;
        },
        goBackToThemePanel: (state) => {
            state.chosenThemeObjectPanel = null;
            state.isChosenTheme = false;
        },
        setChosenTheme: (state, action: PayloadAction<ThemeProps>) => {
            state.chosenThemeObject = action.payload;
        }
    },
});

export const {setChosenThemePanel, goBackToThemePanel, setChosenTheme} = chosenThemeSlice.actions;
export default chosenThemeSlice.reducer;

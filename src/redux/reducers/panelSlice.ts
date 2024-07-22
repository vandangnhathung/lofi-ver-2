import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface panelProps {
    panelScene: boolean;
}

const initialState: panelProps = {
    panelScene: false,
};

const panelSlice = createSlice({
    name: "panel",
    initialState,
    reducers: {
        setOpenPanelScene: (state, action: PayloadAction<boolean>) => {
            state.panelScene = action.payload;
        }
    },
});

export const {
    setOpenPanelScene
} = panelSlice.actions;
export default panelSlice.reducer;

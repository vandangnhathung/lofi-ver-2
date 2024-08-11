import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface panelProps {
    panelScene: boolean;
    controlBar: boolean;
}

const initialState: panelProps = {
    panelScene: false,
    controlBar: false,
};

const panelSlice = createSlice({
    name: "panel",
    initialState,
    reducers: {
        setOpenPanelScene: (state, action: PayloadAction<boolean>) => {
            state.panelScene = action.payload;
        },
        setOpenPanelControlBar: (state, action: PayloadAction<boolean>) => {
            console.log("hello")
            state.controlBar = action.payload;
        }
    },
});

export const {
    setOpenPanelScene,
    setOpenPanelControlBar
} = panelSlice.actions;
export default panelSlice.reducer;

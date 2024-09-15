import React from 'react';
import Slider from '@mui/material/Slider';
import {styled} from "@mui/material";
import {Volume, Volume2} from "lucide-react";

const LofiSlider = styled(Slider)(({theme}) => ({
    height: 8,
}));


const ControlBarMenuMiddle = () => {

    const [value, setValue] = React.useState<number>(30);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    };

    return (
        <div className={`flex flex-col gap-1 glass-card`}>
            <p className="uppercase">Music volume</p>
            <div className="flex items-center gap-3">
                <Volume fill={'var(--primary-color)'} size={28} className={'text-primary'}/>
                <LofiSlider aria-label="Volume" value={value} onChange={handleChange} valueLabelDisplay="auto"/>
                <Volume2 fill={'var(--primary-color)'} size={28} className={'text-primary'}/>
            </div>
        </div>
    );
};

export default ControlBarMenuMiddle;
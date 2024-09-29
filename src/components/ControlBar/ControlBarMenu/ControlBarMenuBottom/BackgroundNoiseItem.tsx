import React from "react";
import Slider from "@mui/material/Slider";
import {useDispatch} from "react-redux";
import {setVolumeSound} from "@/redux/reducers/backgroundSoundSlice";
import AudioPlayerNoise from "../AudioPlayerNoise";

interface BackgroundNoiseItemProps {
    index: number;
    soundName: string;
    className?: string;
    volume: number;
}

const BackgroundNoiseItem: React.FC<BackgroundNoiseItemProps> = ({
                                                                     index,
                                                                     soundName,
                                                                     className,
                                                                     volume = 0,
                                                                 }) => {
    const dispatch = useDispatch();

    const handleChange = (e: Event, newValue: number | number[]) => {
        const newVolume = (newValue as number) / 100;
        dispatch(setVolumeSound({soundName, newVolume})); // Dispatch action to update volume in Redux store
    };

    return (
        <li
            className={`flex items-center gap-4 pl-3 pr-8 ${className}`}
            style={{
                transitionDelay: `${index * 100}ms`,
            }}
        >
            <div className="w-1/3 ">
                <p className="text-[#ccc]">{soundName}</p>
            </div>
            <div className={`w-2/3 flex justify-center`}>
                <Slider
                    aria-label="Background Volume"
                    value={Math.floor(volume * 100)} // Display volume as a percentage
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                />
            </div>
        </li>
    );
};

export default BackgroundNoiseItem;
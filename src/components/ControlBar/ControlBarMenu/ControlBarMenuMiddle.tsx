import Slider from "@mui/material/Slider";
import {styled} from "@mui/material";
import {Volume, Volume2} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {setVolume} from "@/redux/reducers/playerMusicSlice"; // Adjust path as needed
import {RootState} from "@/redux/store";

const LofiSlider = styled(Slider)(({}) => ({
    height: 8,
}));

const ControlBarMenuMiddle = () => {
    const dispatch = useDispatch();
    const volume = useSelector((state: RootState) => state.playerMusic.volume); // Get volume from Redux store

    const handleChange = (_event: Event, newValue: number | number[]) => {
        const newVolume = (newValue as number) / 100; // Convert slider value to a fraction (0 to 1)
        dispatch(setVolume(newVolume));
    };

    return (
        <div className={`flex flex-col`}>
            <div className={`flex flex-col gap-1 glass-card`}>
                <p className="uppercase">Music volume</p>
                <div className="flex items-center gap-4">
                    <Volume
                        fill={"var(--primary-color)"}
                        size={28}
                        className={"text-primary"}
                    />
                    <LofiSlider
                        aria-label="Volume"
                        value={Math.floor(volume * 100)} // Convert volume to slider range (0 to 100)
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                    />
                    <Volume2
                        fill={"var(--primary-color)"}
                        size={28}
                        className={"text-primary"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ControlBarMenuMiddle;

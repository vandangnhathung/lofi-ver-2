import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const useRainModeStatus = () => {
    // Assuming rain sounds are identified by their IDs or names

    // todo: get the array from data (themeCopy)
    const rainSoundIds = ["rain city", "rain forest"]; // Add all rain sound IDs here

    const allBackgroundSounds = useSelector(
        (state: RootState) => state.backgroundSound.allBackgroundSounds
    );

    // Check if any rain sound has a volume greater than 0
    const isRainModeActive = allBackgroundSounds.some(
        (sound) => rainSoundIds.includes(sound.name) && sound.volume > 0
    );

    // If no rain sounds are active, rain mode should be false
    return !isRainModeActive;
};

export default useRainModeStatus;
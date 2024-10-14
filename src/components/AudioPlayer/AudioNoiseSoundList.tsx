import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import AudioNoiseSound from "@/components/AudioPlayer/AudioNoiseSound";

const AudioNoiseSoundList = () => {
    const allBackgroundSounds = useSelector(
        (state: RootState) => state.backgroundSound.allBackgroundSounds
    );

    return (
        <ul>
            {allBackgroundSounds.map((sound) => (
                <li className={`hidden`} key={sound.name}>
                    <AudioNoiseSound soundId={sound.name} soundSrc={sound.src || ""}/>
                </li>
            ))}
        </ul>
    );
};

export default AudioNoiseSoundList;

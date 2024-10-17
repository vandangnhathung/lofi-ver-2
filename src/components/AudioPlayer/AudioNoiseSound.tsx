import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {setRainMode} from "@/redux/reducers/modeSlice";
import useRainModeStatus from "@/hooks/useRainModeStatus";

interface AudioNoiseSoundProps {
    soundId: string;
    soundSrc: string;
}

const AudioNoiseSound: React.FC<AudioNoiseSoundProps> = ({
                                                             soundId,
                                                             soundSrc,
                                                         }) => {
    const dispatch = useDispatch();
    const noiseAudioRef = useRef<HTMLAudioElement>(null);
    const isRainModeInactive = useRainModeStatus();

    const currentVolume = useSelector(
        (state: RootState) =>
            state.backgroundSound.allBackgroundSounds.find(
                (sound) => sound.name === soundId
            )?.volume
    );

    useEffect(() => {
        if (noiseAudioRef.current && soundSrc) {
            const fullSrcPath = `/public/assets/sounds/${soundSrc}`;
            noiseAudioRef.current.src = ""; // Clear the src first
            noiseAudioRef.current.load(); // Reset the audio element
            noiseAudioRef.current.src = fullSrcPath;
            noiseAudioRef.current.load(); // Load the new source
        }
    }, [soundSrc]);

    useEffect(() => {
        if (noiseAudioRef.current) {
            noiseAudioRef.current.volume = currentVolume ?? 0; // Update audio element volume
        }
    }, [currentVolume]); // Only re-run the effect if volume changes

    useEffect(() => {
        // Add an event listener to play the audio once it's loaded
        const audioElement = noiseAudioRef.current;
        const handleCanPlay = () => {
            if ((currentVolume ?? 0) > 0) {
                audioElement?.play().catch((error) => {
                    console.error("Error playing audio:", error);
                });

                if (soundId.includes("rain")) {
                    dispatch(setRainMode(true));
                }
            } else if ((currentVolume ?? 0) === 0) {
                audioElement?.pause();
                if (soundId.includes("rain") && isRainModeInactive) {
                    dispatch(setRainMode(false));
                }
            }
        };

        handleCanPlay();
    }, [dispatch, currentVolume, soundId]);

    return (
        <audio controls ref={noiseAudioRef} loop>
            <source src={`/public/assets/sounds/${soundSrc}`} type="audio/mpeg"/>
        </audio>
    );
};

export default React.memo(AudioNoiseSound);
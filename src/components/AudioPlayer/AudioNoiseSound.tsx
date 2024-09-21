import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

interface AudioNoiseSoundProps {
    soundId: string;
    soundSrc: string;
}

const AudioNoiseSound: React.FC<AudioNoiseSoundProps> = ({soundId, soundSrc}) => {
    const noiseAudioRef = useRef<HTMLAudioElement>(null);
    const backgroundNoise = useSelector((state: RootState) => state.backgroundSound.volumes);

    useEffect(() => {
        if (noiseAudioRef.current && soundSrc) {
            const fullSrcPath = `/assets/sounds/${soundSrc}`;
            noiseAudioRef.current.src = ''; // Clear the src first
            noiseAudioRef.current.load(); // Reset the audio element
            noiseAudioRef.current.src = fullSrcPath;
            noiseAudioRef.current.load(); // Load the new source
        }
    }, [soundSrc]);

    useEffect(() => {
        if (backgroundNoise[soundId] > 0 && noiseAudioRef.current?.src) {
            noiseAudioRef.current.play().catch((error) => {
                console.error("Error playing audio:", error);
            });
        } else {
            noiseAudioRef.current?.pause();
        }
    }, [soundId, backgroundNoise, soundSrc]);

    return (
        <audio controls ref={noiseAudioRef} loop>
            <source src={`/assets/sounds/${soundSrc}`} type="audio/mpeg"/>
        </audio>
    );
};

export default AudioNoiseSound;

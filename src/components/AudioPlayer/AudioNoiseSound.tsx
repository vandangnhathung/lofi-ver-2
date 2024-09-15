import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

// Define prop types
interface AudioNoiseSoundProps {
    soundId: string;
    soundSrc: string;
}

const AudioNoiseSound: React.FC<AudioNoiseSoundProps> = ({soundId, soundSrc}) => {
    const noiseAudioRef = useRef<HTMLAudioElement>(null);
    const backgroundNoise = useSelector((state: RootState) => state.backgroundSound.volumes);
    useEffect(() => {
        // console.log(backgroundNoise)

    }, [backgroundNoise])

    //
    // useEffect(() => {
    //     if (noiseAudioRef.current && soundSrc) {
    //         noiseAudioRef.current.src = soundSrc;  // Set the source dynamically
    //         noiseAudioRef.current.play().catch(error => {
    //             console.error('Error playing audio:', error);
    //         });
    //     }
    // }, [soundSrc]);

    useEffect(() => {
        // console.log('backgroundNoise[soundSrc]', backgroundNoise[soundId]);
        if (backgroundNoise[soundId] > 0) {
            console.log('play')
            noiseAudioRef.current?.play();
        } else {
            noiseAudioRef.current?.pause();
        }
    }, [soundId, backgroundNoise]);

    return (
        <div>
            <audio controls ref={noiseAudioRef} loop>
                <source src={`/assets/sounds/${soundSrc}`} type="audio/mpeg"/>
            </audio>
        </div>
    );
};

export default AudioNoiseSound;

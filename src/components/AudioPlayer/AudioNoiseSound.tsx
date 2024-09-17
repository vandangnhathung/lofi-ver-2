import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/store';

interface AudioNoiseSoundProps {
    soundId: string;
    soundSrc: string;
}

const AudioNoiseSound: React.FC<AudioNoiseSoundProps> = ({soundId, soundSrc}) => {
    const noiseAudioRef = useRef<HTMLAudioElement>(null);
    const backgroundNoise = useSelector((state: RootState) => state.backgroundSound.volumes);

    useEffect(() => {
        if (noiseAudioRef.current) {
            const audioElement = noiseAudioRef.current;
            audioElement.src = `/assets/sounds/${soundSrc}`;
            audioElement.load();
        }
    }, [soundSrc]);

    useEffect(() => {
        if (noiseAudioRef.current) {
            const audioElement = noiseAudioRef.current;
            if (backgroundNoise[soundId] > 0) {
                audioElement.play().catch(error => console.error("Error playing audio:", error));
            } else {
                audioElement.pause();
            }
        }
    }, [soundId, backgroundNoise]);


    return (
        <audio ref={noiseAudioRef} loop>
            <source src={`/assets/sounds/${soundSrc}`} type="audio/mpeg"/>
        </audio>
    );
};

export default AudioNoiseSound;

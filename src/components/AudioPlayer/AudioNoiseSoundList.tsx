import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {SceneButtonProps} from "@/components/Scene/Type";
import AudioNoiseSound from "@/components/AudioPlayer/AudioNoiseSound";

const AudioNoiseSoundList = () => {
    const currentScene = useSelector((state: RootState) => state.scene.activeScene);

    // Initialize state as an empty array
    const [buttonSound, setButtonSound] = useState<SceneButtonProps[]>([]);

    useEffect(() => {
        const sounds = currentScene.buttons.filter(button => button.sound);
        setButtonSound([]); // Clear the previous sounds
        setButtonSound(sounds); // Then set the new ones
    }, [currentScene]);

    console.log(currentScene, buttonSound)

    return (
        <ul>
            {buttonSound.map((button) => (
                <li key={button.id}>
                    <AudioNoiseSound soundId={button.id} soundSrc={button.sound || ''}/>
                </li>
            ))}
        </ul>
    );
};

export default AudioNoiseSoundList;

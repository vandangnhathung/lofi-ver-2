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
        // Filter buttons with sound and update the state
        const sounds = currentScene.buttons.filter(button => button.sound);
        console.log(sounds);
        setButtonSound(sounds);
        console.log(currentScene, buttonSound)
    }, [currentScene]);


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

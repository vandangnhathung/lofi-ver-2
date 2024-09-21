import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { SceneButtonProps } from "@/components/Scene/Type";
import AudioNoiseSound from "@/components/AudioPlayer/AudioNoiseSound";

const AudioNoiseSoundList = () => {
  const { backgroundSounds } = useSelector(
    (state: RootState) => state.backgroundSound
  );

  const currentScene = useSelector(
    (state: RootState) => state.scene.activeScene
  );

  // Initialize state as an empty array
  const [buttonSound, setButtonSound] = useState<SceneButtonProps[]>([]);

  useEffect(() => {
    // Filter buttons with sound and update the state
    const sounds = currentScene.buttons.filter((button) => button.sound);
    // console.log(sounds);
    setButtonSound(sounds);
    // console.log(currentScene, buttonSound)
  }, [currentScene]);

  return (
    <ul>
      {backgroundSounds.map((sound) => (
        <li key={sound.name}>
          <AudioNoiseSound soundId={sound.name} soundSrc={sound.src || ""} />
        </li>
      ))}
    </ul>
  );
};

export default AudioNoiseSoundList;

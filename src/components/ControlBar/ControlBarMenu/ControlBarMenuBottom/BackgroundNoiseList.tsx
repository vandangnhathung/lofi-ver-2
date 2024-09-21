import React, { useEffect, useMemo } from "react";
import BackgroundNoiseItem from "@/components/ControlBar/ControlBarMenu/ControlBarMenuBottom/BackgroundNoiseItem";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { BackgroundSound } from "@/redux/reducers/backgroundSoundSlice";

const BackgroundNoiseList = () => {
  const { backgroundSounds } = useSelector(
    (state: RootState) => state.backgroundSound
  );

  const currentScene = useSelector(
    (state: RootState) => state.scene.activeScene
  );

  const newBackgroundSounds = useMemo(() => {
    const sceneBackgroundSounds = new Set(
      currentScene.buttons.map((button) => button.sound)
    );

    console.log(sceneBackgroundSounds);

    const [updatedSceneBackgroundSounds, updatedOtherBackgroundSounds] =
      backgroundSounds.reduce<BackgroundSound[][]>(
        (acc, sound) => {
          if (sceneBackgroundSounds.has(sound.src)) {
            acc[0].push(sound);
          } else {
            acc[1].push(sound);
          }
          return acc;
        },
        [[], []]
      );

    return [...updatedSceneBackgroundSounds, ...updatedOtherBackgroundSounds];
  }, [currentScene, backgroundSounds]);

  const showBackgroundNoise = useMemo(() => {
    return newBackgroundSounds.length > 0;
  }, [newBackgroundSounds]);

  return (
    <ul className="flex flex-col gap-2">
      {newBackgroundSounds.map((sound) => (
        <BackgroundNoiseItem key={sound.name} soundName={sound.name} />
      ))}
    </ul>
  );
};

export default BackgroundNoiseList;

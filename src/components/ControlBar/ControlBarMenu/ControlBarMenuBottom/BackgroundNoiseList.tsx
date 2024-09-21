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

  const mixMore = useSelector(
    (state: RootState) => state.backgroundSound.mixMore
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

    return [updatedSceneBackgroundSounds, updatedOtherBackgroundSounds];
  }, [currentScene, backgroundSounds]);

  return (
    <ul
      className={`${mixMore ? "overflow-y-auto overflow-x-hidden scrollbar-hidden" : ""} flex flex-col gap-2 h-full`}
    >
      {newBackgroundSounds[0].map((sound, index) => (
        <BackgroundNoiseItem
          key={sound.name}
          soundName={sound.name}
          index={index}
        />
      ))}
      {newBackgroundSounds[1].map((sound, index) => (
        <BackgroundNoiseItem
          key={sound.name}
          soundName={sound.name}
          index={index}
          className={`${mixMore ? "opacity-100" : "opacity-0"}`}
        />
      ))}
    </ul>
  );
};

export default BackgroundNoiseList;

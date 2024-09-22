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
            acc[0].push({ ...sound, volume: 0 });
          } else {
            acc[1].push({ ...sound, volume: 0 });
          }
          return acc;
        },
        [[], []]
      );

    return [updatedSceneBackgroundSounds, updatedOtherBackgroundSounds];
  }, [currentScene, backgroundSounds]);

  console.log("newBackgroundSounds:", newBackgroundSounds);

  const limitBackgroundNoiseQuantity = ({
    currentSceneBackgroundSounds,
    backgroundSounds,
    quantities,
  }: {
    currentSceneBackgroundSounds: BackgroundSound[];
    backgroundSounds: BackgroundSound[];
    quantities: number;
  }) => {
    const adjustedQuantities = Math.max(
      quantities,
      currentSceneBackgroundSounds.length
    );
    return backgroundSounds.slice(
      0,
      adjustedQuantities - currentSceneBackgroundSounds.length
    );
  };

  // Update quantities to change the number of background noises
  const limitedBackgroundSounds = limitBackgroundNoiseQuantity({
    currentSceneBackgroundSounds: newBackgroundSounds[0],
    backgroundSounds: newBackgroundSounds[1],
    quantities: 15,
  });

  console.log("limitedBackgroundSounds:", limitedBackgroundSounds);

  return (
    <ul className={`flex flex-col gap-2 h-full`}>
      {newBackgroundSounds[0].map((sound, index) => (
        <BackgroundNoiseItem
          key={sound.name}
          soundName={sound.name}
          index={index}
          className={``}
        />
      ))}
      {limitedBackgroundSounds.map((sound, index) => (
        <BackgroundNoiseItem
          key={sound.name}
          soundName={sound.name}
          index={index}
          className={`${mixMore ? "opacity-100" : "opacity-0 cursor-default pointer-events-none"}`}
        />
      ))}
    </ul>
  );
};

export default BackgroundNoiseList;

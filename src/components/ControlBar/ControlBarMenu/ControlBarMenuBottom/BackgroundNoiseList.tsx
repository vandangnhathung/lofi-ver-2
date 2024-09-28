import React, { useMemo } from "react";
import BackgroundNoiseItem from "@/components/ControlBar/ControlBarMenu/ControlBarMenuBottom/BackgroundNoiseItem";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  BackgroundSound,
  setNewSounds,
} from "@/redux/reducers/backgroundSoundSlice";

const BackgroundNoiseList = () => {
  const dispatch = useDispatch();

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

    console.log(updatedSceneBackgroundSounds, updatedOtherBackgroundSounds);

    dispatch(
      setNewSounds([
        ...updatedSceneBackgroundSounds,
        ...updatedOtherBackgroundSounds,
      ])
    );

    return [updatedSceneBackgroundSounds, updatedOtherBackgroundSounds];
  }, [currentScene, backgroundSounds, dispatch]);

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

  //todo: set priority sounds
  //todo: recheck the logic & UI

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
          volume={sound.volume ?? 0} // Provide a default value of 0 if sound.volume is undefined
        />
      ))}
      {limitedBackgroundSounds.map((sound, index) => (
        <BackgroundNoiseItem
          key={sound.name}
          soundName={sound.name}
          index={index}
          className={`${mixMore ? "opacity-100 transition-all  duration-1000" : "duration-0 opacity-0 cursor-default pointer-events-none"}`}
          volume={sound.volume ?? 0} // Provide a default value of 0 if sound.volume is undefined
        />
      ))}
    </ul>
  );
};

export default BackgroundNoiseList;

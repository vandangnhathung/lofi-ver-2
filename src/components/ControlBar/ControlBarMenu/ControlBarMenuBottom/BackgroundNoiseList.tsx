import BackgroundNoiseItem from "@/components/ControlBar/ControlBarMenu/ControlBarMenuBottom/BackgroundNoiseItem";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";

const BackgroundNoiseList = () => {
    const allBackgroundSounds = useSelector((state: RootState) => state.backgroundSound.allBackgroundSounds);
    const currentScene = useSelector((state: RootState) => state.scene.activeScene);
    const mixMore = useSelector((state: RootState) => state.backgroundSound.mixMore);

    const currentSceneBackgroundSounds = currentScene.buttons.filter((button) => button.sound).map(button => button.id);


    return (
        <ul className={`flex flex-col gap-2 h-full`}>
            {allBackgroundSounds.map((sound) => {
                const isCurrentSceneSound = currentSceneBackgroundSounds.includes(sound.name);
                if (isCurrentSceneSound) {
                    return (
                        <BackgroundNoiseItem
                            key={sound.name}
                            soundName={sound.name}
                            index={0}
                            className={`noise-priority-Item`}
                            volume={sound.volume ?? 0} // Provide a default value of 0 if sound.volume is undefined
                        />
                    );
                }
            })}

            {allBackgroundSounds.map((sound) => {
                const isCurrentSceneSound = currentSceneBackgroundSounds.includes(sound.name);
                if (!isCurrentSceneSound) {
                    return (
                        <BackgroundNoiseItem
                            key={sound.name}
                            soundName={sound.name}
                            index={0}
                            className={`${mixMore ? "opacity-100 transition-all  duration-1000" : "duration-0 opacity-0 cursor-default pointer-events-none"}`}
                            volume={sound.volume ?? 0} // Provide a default value of 0 if sound.volume is undefined
                        />
                    );
                }
            })}
        </ul>
    );
};

export default BackgroundNoiseList;
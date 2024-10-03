import React from "react";
import {SceneButtonProps} from "@/components/Scene/Type";
import {useDispatch, useSelector} from "react-redux";
import {setRainMode} from "@/redux/reducers/modeSlice";
import {RootState} from "@/redux/store";
import {setActiveScene} from "@/redux/reducers/sceneSlice";
import {setTransitionEnd} from "@/redux/reducers/loadingSlice";
import {setVolumeSound} from "@/redux/reducers/backgroundSoundSlice";
import Slider from "@mui/material/Slider";

const SceneButton = ({button}: { button: SceneButtonProps }) => {
    const chosenThemeObject = useSelector(
        (state: RootState) => state.themes.chosenThemeObject
    );
    const rainMode = useSelector((state: RootState) => state.mode.rainMode);
    const dispatch = useDispatch();
    const isButtonClicked = useSelector(
        (state: RootState) => state.loading.isButtonClicked
    );
    const currentVolume = useSelector(
        (state: RootState) =>
            state.backgroundSound.allBackgroundSounds.find(
                (sound) => sound.name === button.id
            )?.volume
    ) ?? 0;

    console.log(currentVolume);

    const handleSceneButton = () => {
        // Check if the button was clicked and proceed
        if (isButtonClicked) {
            let transitionShouldEnd = false;

            currentVolume > 0 ? dispatch(setVolumeSound({
                soundName: button.id,
                newVolume: 0
            })) : dispatch(setVolumeSound({soundName: button.id, newVolume: 0.5}));

            if (button.id.includes("rain")) {
                // Toggle rain mode and mark to trigger transition end
                dispatch(setRainMode(!rainMode));
                transitionShouldEnd = true;
            } else if (button.toSceneId) {
                // Find the new scene based on the button's target ID
                const newScene = chosenThemeObject?.scenes.find(
                    (scene) => scene.id === button.toSceneId
                );
                if (newScene) {
                    // Update the active scene
                    dispatch(setActiveScene(newScene));
                    transitionShouldEnd = true; // Mark to trigger setTransitionEnd
                }
            }

            // Only dispatch setTransitionEnd if conditions were met
            if (transitionShouldEnd) {
                dispatch(setTransitionEnd(false));
            }
        }

        console.log('button: ', button);
    };

    const handleChangeVolume = () => {

    }

    return (
        <button
            onClick={handleSceneButton}
            className={`group absolute`}
            style={{top: button.position.top, left: button.position.left}}
        >
            <div className={`w-12 h-12 p-3`}>
                <div
                    className={`h-full after:transition-all after:duration-500 after:rounded-full group-hover:after:bg-primary after:absolute after:inset-0 after:opacity-30`}
                >
                    <div
                        className="h-full transition-all duration-500 rounded-full group-hover:bg-primary border-2 border-white">
                    </div>
                </div>
            </div>

            <div
                className={`group-hover:visible group-hover:opacity-100 opacity-0 invisible relative transition-all duration-2000 flex flex-col gap-y-2`}>
                <div
                    className="min-w-[160px] py-2 px-8 bg-[rgba(0,0,0,0.6)] absolute left-1/2 -translate-x-1/2 top-full translate-y-1 rounded-md">
                    <p className={`text-white`}>{button.label}</p>

                    {button?.sound &&
                        <Slider
                            aria-label="Background Volume"
                            value={Math.floor(currentVolume * 100)} // Display volume as a percentage
                            onChange={handleChangeVolume}
                            valueLabelDisplay="auto"
                            className={`transition-all ${currentVolume > 0 ? '!h-[8px] visible block' : '!h-0 invisible !p-0 block'}`}
                        />
                    }
                </div>
            </div>
        </button>
    );
};

export default SceneButton;

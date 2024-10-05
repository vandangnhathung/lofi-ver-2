import React from "react";
import {SceneButtonProps} from "@/components/Scene/Type";
import {useDispatch, useSelector} from "react-redux";
import {setActiveScene} from "@/redux/reducers/sceneSlice";
import {setTransitionEnd} from "@/redux/reducers/loadingSlice";
import {setVolumeSound} from "@/redux/reducers/backgroundSoundSlice";
import Slider from "@mui/material/Slider";
import {RootState} from "@/redux/store";
import {setRainMode} from "@/redux/reducers/modeSlice";
import useRainModeStatus from "@/hooks/useRainModeStatus";

const SceneButton = ({button}: { button: SceneButtonProps }) => {
    const dispatch = useDispatch();
    const chosenThemeObject = useSelector(
        (state: RootState) => state.themes.chosenThemeObject
    );

    const isRainModeInactive = useRainModeStatus();

    const isButtonClicked = useSelector(
        (state: RootState) => state.loading.isButtonClicked
    );
    const currentVolume = useSelector(
        (state: RootState) =>
            state.backgroundSound.allBackgroundSounds.find(
                (sound) => sound.name === button.id
            )?.volume
    ) ?? 0;

    const handleSceneButton = () => {
        if (isButtonClicked) {
            let transitionShouldEnd = false;

            currentVolume > 0 ? dispatch(setVolumeSound({
                soundName: button.id,
                newVolume: 0
            })) : dispatch(setVolumeSound({soundName: button.id, newVolume: 0.5}));

            if (button.id.includes("rain")) {

                if (isRainModeInactive) {
                    dispatch(setRainMode(true));
                } else {
                    dispatch(setRainMode(false));
                }

                transitionShouldEnd = true;
            } else if (button.toSceneId) {
                const newScene = chosenThemeObject?.scenes.find(
                    (scene) => scene.id === button.toSceneId
                );
                if (newScene) {
                    dispatch(setActiveScene(newScene));
                    transitionShouldEnd = true;
                }
            }

            if (transitionShouldEnd) {
                dispatch(setTransitionEnd(false));
            }
        }
    };

    const handleChangeVolume = (e: Event, newValue: number | number[]) => {
        const newVolume = (newValue as number) / 100;
        dispatch(setVolumeSound({soundName: button.id, newVolume}));
    };

    return (
        <div className={`group absolute`}
             style={{top: button.position.top, left: button.position.left}}>
            <button
                onClick={handleSceneButton}
                className={``}
            >
                <div className={`w-12 h-12 p-3`}>
                    <div
                        className={`h-full after:transition-all after:duration-500 after:rounded-full group-hover:after:bg-primary after:absolute after:inset-0 after:opacity-30`}
                    >
                        <div
                            className={`${currentVolume > 0 ? 'before:opacity-100' : 'before:opacity-0'}
                          h-full transition-all duration-500 rounded-full relative
                           before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-primary before:rounded-full 
                           group-hover:bg-primary border-2 border-white`}
                            style={{transformOrigin: "center center"}}>
                        </div>
                    </div>
                </div>
            </button>

            <div
                className={`text-center group-hover:visible group-hover:opacity-100 opacity-0 invisible relative transition-all duration-2000 flex flex-col gap-y-2`}>
                <div
                    className={`min-w-[180px] py-2 px-8 bg-[rgba(0,0,0,0.6)] 
                    absolute left-1/2 -translate-x-1/2 top-full translate-y-1 rounded-md`}>
                    <p className={`text-white`}>{button.label}</p>

                    {button?.sound &&
                        <div>
                            <Slider
                                aria-label="Background Volume"
                                value={Math.floor(currentVolume * 100)}
                                onChange={handleChangeVolume}
                                valueLabelDisplay="auto"
                                className={`transition-all !block ${currentVolume > 0 ? '!h-[8px] opacity-100' : '!h-0 opacity-0 !p-0'}`}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default SceneButton;
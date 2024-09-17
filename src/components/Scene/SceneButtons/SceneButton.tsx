import React from 'react';
import {SceneButtonProps} from "@/components/Scene/Type";
import {useDispatch, useSelector} from "react-redux";
import {setRainMode} from "@/redux/reducers/modeSlice";
import {RootState} from "@/redux/store";
import {setActiveScene} from "@/redux/reducers/sceneSlice";
import {setTransitionEnd} from "@/redux/reducers/loadingSlice";
import {setNewSound, toggleSound} from "@/redux/reducers/BackgroundSoundSlice";

const SceneButton = ({button}: { button: SceneButtonProps }) => {
    const chosenThemeObject = useSelector((state: RootState) => state.themes.chosenThemeObject);
    const rainMode = useSelector((state: RootState) => state.mode.rainMode);
    const dispatch = useDispatch();
    const isButtonClicked = useSelector((state: RootState) => state.loading.isButtonClicked);
    const activeScene = useSelector((state: RootState) => state.scene.activeScene);

    const handleSceneButton = () => {
        // Check if the button was clicked and proceed
        if (isButtonClicked) {
            let transitionShouldEnd = false;

            if (button.id.includes('rain')) {
                // Toggle rain mode and mark to trigger transition end
                dispatch(setRainMode(!rainMode));
                transitionShouldEnd = true;
            } else if (button.toSceneId) {
                // Find the new scene based on the button's target ID
                const newScene = chosenThemeObject?.scenes.find(scene => scene.id === button.toSceneId);

                if (newScene) {
                    const previousSounds = activeScene.buttons.filter(sceneButton => sceneButton.sound);
                    const newSounds = newScene.buttons.filter(sceneButton => sceneButton.sound);

                    // If the sound isn't existing, generate it
                    newSounds.forEach(newSound => {
                        const isExisting = previousSounds.some(previousSound => previousSound.id === newSound.id);
                        if (!isExisting) {
                            // Dispatch the new sound
                            console.log('New sound:', newSound.id, newSound.sound);
                            dispatch(setNewSound(newSound.id));
                        }
                    });

                    // Update the active scene
                    dispatch(setActiveScene(newScene));
                    transitionShouldEnd = true; // Mark to trigger setTransitionEnd
                }
            }

            // Toggle the sound for the button's ID
            dispatch(toggleSound(button.id));

            // Only dispatch setTransitionEnd if conditions were met
            if (transitionShouldEnd) {
                dispatch(setTransitionEnd(false));
            }
        }
    };

    return (
        <button onClick={handleSceneButton} className={`group absolute`}
                style={{top: button.position.top, left: button.position.left}}>
            <div className={`w-12 h-12 p-3`}>
                <div
                    className={`h-full after:transition-all after:duration-500 after:rounded-full group-hover:after:bg-primary after:absolute after:inset-0 after:opacity-30`}>
                    <div
                        className="h-full transition-all duration-500 rounded-full group-hover:bg-primary border-2 border-white"></div>
                </div>
            </div>
        </button>
    );
};

export default SceneButton;

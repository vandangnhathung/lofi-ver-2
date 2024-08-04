import React from 'react';
import {SceneButtonProps} from "@/components/Scene/Type";
import {useDispatch, useSelector} from "react-redux";
import {setRainMode} from "@/redux/reducers/modeSlice";
import {RootState} from "@/redux/store";
import {setActiveScene} from "@/redux/reducers/sceneSlice";

const SceneButton = ({button}: { button: SceneButtonProps }) => {
    const chosenThemeObject = useSelector((state: RootState) => state.themes.chosenThemeObject);
    const rainMode = useSelector((state: RootState) => state.mode.rainMode);
    const dispatch = useDispatch();

    const handleSceneButton = () => {
        if (button.id === 'rain') {
            dispatch(setRainMode(!rainMode));
        } else if (button.toSceneId) {
            chosenThemeObject?.scenes.forEach(scene => {
                if (scene.id === button.toSceneId) {
                    dispatch(setActiveScene(scene));
                }
            });
        }
    }

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
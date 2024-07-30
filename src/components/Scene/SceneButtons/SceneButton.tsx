import React from 'react';
import {SceneButtonProps} from "@/components/Scene/Type";
import {useDispatch, useSelector} from "react-redux";
import {setRainMode} from "@/redux/reducers/modeSlice";
import {RootState} from "@/redux/store";

const SceneButton = ({button}: { button: SceneButtonProps }) => {
    const rainMode = useSelector((state: RootState) => state.mode.rainMode);
    const activeScene = useSelector((state: RootState) => state.scene.activeScene);
    const dispatch = useDispatch();


    const handleSceneButton = () => {
        console.log(button);
        if (button.id === 'rain') {
            dispatch(setRainMode(!rainMode));
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
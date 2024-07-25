import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {setOpenPanelScene} from '@/redux/reducers/panelSlice';
import {setLoadingScene} from '@/redux/reducers/loadingSlice';
import MenuButton from "@/components/MenuButton/MenuButton";
import {Images} from "lucide-react";
import themesData from "@/assets/data/themes.json";
import "@/components/Panel/Panel.scss";
import SliderCustom from "@/components/SliderCustom/SliderCustom";
import PanelScene from "@/components/Panel/PanelScene";
import {isChildOfElement} from "@/helpers";
import {SceneProps, ThemeProps} from "@/components/Scene/Type";
import {setAnimation, setScene} from "@/redux/reducers/sceneSlice";

const SwitchSceneButton = () => {
    const openPanel = useSelector((state: RootState) => state.panel.panelScene);
    const loadingScene = useSelector((state: RootState) => state.loading.loadingScene);
    const dispatch = useDispatch();
    const sceneButtonRef = useRef<HTMLButtonElement>(null);
    const currentScene = useSelector((state: RootState) => state.scene.activeScene);

    const handleSwitchSceneButton = (newScene: SceneProps) => {
        if (!loadingScene && newScene !== currentScene) {
            dispatch(setScene(newScene));
            dispatch(setAnimation('out'));
            dispatch(setLoadingScene(true));
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const child = e.target as HTMLElement;
            if (!sceneButtonRef.current?.contains(child) && !isChildOfElement(child, 'panel')) {
                dispatch(setOpenPanelScene(false));
            }
        };

        if (openPanel) {
            window.addEventListener('click', handleClickOutside);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [openPanel]);

    const [isChosenTheme, setIsChosenTheme] = useState(false);
    const [chosenTheme, setChosenTheme] = useState({} as ThemeProps);
    const handleChooseTheme = (theme: ThemeProps) => {
        setIsChosenTheme(true);
        setChosenTheme(theme);
        console.log("hello", theme);
    }

    // Flatten the scenes from all themes into a single array
    const scenes = chosenTheme.scenes;

    return (
        <>
            <MenuButton isActive={openPanel} ref={sceneButtonRef}
                        onClick={() => dispatch(setOpenPanelScene(!openPanel))} IconComponent={Images}/>

            <div
                className={`panel absolute bottom-lofi-panel-position text-white transition-all duration-500 ${openPanel ? 'opacity-100' : 'opacity-0 invisible'}`}>
                <div className="panel-inner bg-black rounded-xl">
                    <div className="switch-scene">
                        <div
                            className="switch-scene__title transition-all hover:text-primary py-2 pl-[10px] items-center inline-flex gap-x-2 cursor-pointer">
                            <span className="">Scenes</span>
                        </div>
                        <SliderCustom className="">
                            {isChosenTheme && scenes.map((scene, index) => (
                                <PanelScene onClick={() => handleSwitchSceneButton(scene)} index={index}
                                            thumbnail={scene.thumbnail}
                                            key={index}/>
                            ))}
                            {!isChosenTheme && themesData.map((theme, index) => (
                                <PanelScene onClick={() => handleChooseTheme(theme)} index={index}
                                            thumbnail={theme.thumbnail}
                                            key={index}/>
                            ))}
                        </SliderCustom>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SwitchSceneButton;

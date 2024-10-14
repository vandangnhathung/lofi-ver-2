import {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {setOpenPanelScene} from '@/redux/reducers/panelSlice';
import {setLoadingScene} from '@/redux/reducers/loadingSlice';
import MenuButton from "@/components/MenuButton/MenuButton";
import {ChevronLeft, Images} from "lucide-react";
import "@/components/Panel/Panel.scss";
import SliderCustom from "@/components/SliderCustom/SliderCustom";
import PanelScene from "@/components/Panel/PanelScene";
import {SceneProps, ThemeProps} from "@/components/Scene/Type";
import {setAnimation, setScene} from "@/redux/reducers/sceneSlice";
import {goBackToThemePanel, setChosenThemePanel} from '@/redux/reducers/themeSlice';

const SwitchSceneButton = () => {
    const themesData = useSelector((state: RootState) => state.themes.themes);
    const openPanel = useSelector((state: RootState) => state.panel.panelScene);
    const loadingScene = useSelector((state: RootState) => state.loading.loadingScene);
    const currentScene = useSelector((state: RootState) => state.scene.activeScene);
    const {chosenThemeObjectPanel, isChosenTheme} = useSelector((state: RootState) => state.themes);
    const dispatch = useDispatch();

    // Refs
    const sceneButtonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    const handleSwitchSceneButton = (newScene: SceneProps) => {
        if (!loadingScene && newScene !== currentScene) {
            dispatch(setScene(newScene));
            dispatch(setAnimation('out'));
            // dispatch(setChosenTheme(chosenThemeObjectPanel!));
            // todo: How state is updated in this function?

            dispatch(setLoadingScene(true));
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const child = e.target as HTMLElement;
            if (!sceneButtonRef.current?.contains(child) && !panelRef.current?.contains(child)) {
                dispatch(setOpenPanelScene(false));
            }
        };

        if (openPanel) {
            window.addEventListener('click', handleClickOutside, true);
        }

        return () => {
            window.removeEventListener('click', handleClickOutside, true);
        };
    }, [openPanel]);

    const handleChooseTheme = (theme: ThemeProps) => {
        dispatch(setChosenThemePanel(theme));
    }

    const handleBackToThemes = () => {
        dispatch(goBackToThemePanel());
    }

    return (
        <>
            <MenuButton isActive={openPanel} ref={sceneButtonRef}
                        onClick={() => dispatch(setOpenPanelScene(!openPanel))} IconComponent={Images}/>
            <div
                ref={panelRef}
                className={`panel absolute left-1/2 -translate-x-1/2 bottom-lofi-panel-position text-white transition-all max-w-full ${chosenThemeObjectPanel?.scenes.length === 1 ? "w-[380px]" : "w-[770px]"} duration-1000 ${openPanel ? 'opacity-100' : 'opacity-0 invisible'}`}>
                <div className="panel-inner bg-black rounded-xl">
                    <div
                        className={`switch-scene transition-all min-h-[169px] ${chosenThemeObjectPanel?.scenes.length === 1 && "max-w-[350px]"}`}>
                        <div
                            className="switch-scene__title py-2 pl-[10px] items-center inline-flex gap-x-2">
                            {isChosenTheme ? (<button onClick={handleBackToThemes}
                                                      className="transition-all hover:text-primary items-center inline-flex cursor-pointer gap-x-2">
                                <ChevronLeft className={`w-5 aspect-square`}/> Switch Scene </button>) : (
                                <span className="">Themes</span>)}
                        </div>
                        <SliderCustom className="">
                            {/* Show all scenes in a specific theme */}
                            {isChosenTheme && chosenThemeObjectPanel?.scenes.map((scene, index) => (
                                <PanelScene onClick={() => handleSwitchSceneButton(scene)} index={index}
                                            thumbnail={scene.thumbnail}
                                            key={index}/>
                            ))}

                            {/* Show all themes */}
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

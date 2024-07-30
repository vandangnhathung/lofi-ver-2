import React, {useEffect, useRef, useState} from 'react';
import {SceneProps} from "@/components/Scene/Type";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {gsap} from "gsap";
import SceneButtons from "@/components/Scene/SceneButtons/SceneButtons";
import {
    setActiveSceneSrc,
    setNightModeClicked,
    setPreviousSceneSrc,
    setRainModeClicked
} from "@/redux/reducers/sceneSlice";

const Scene: React.FC<{ scene: SceneProps }> = ({scene}) => {
    const activeSrc = useSelector((state: RootState) => state.scene.activeSrc);
    const previousSrc = useSelector((state: RootState) => state.scene.previousSrc);
    const nightMode = useSelector((state: RootState) => state.scene.nightMode);
    const rainMode = useSelector((state: RootState) => state.scene.rainMode);
    const nightModeClicked = useSelector((state: RootState) => state.scene.nightModeClicked);
    const rainModeClicked = useSelector((state: RootState) => state.scene.rainModeClicked);

    const dispatch = useDispatch();
    const [firstRender, setFirstRender] = useState<boolean>(true);

    const currentVideoWrapperRef = useRef<HTMLVideoElement>(null);
    const prevVideoWrapperRef = useRef<HTMLVideoElement>(null);

    const getNewSrc = () => {
        return nightMode
            ? (rainMode ? scene.sources.night.rain?.src : scene.sources.night.normal.src)
            : (rainMode ? scene.sources.day.rain?.src : scene.sources.day.normal.src);
    };

    const executeAnimation = ({condition, previousSrc, currentSrc}: {
        condition: boolean,
        previousSrc: string | undefined,
        currentSrc: string | undefined
    }) => {
        const timeline = gsap.timeline();
        console.log("previousSrc: ", previousSrc, "currentSrc: ", currentSrc);
        if (condition) {
            timeline
                .to(currentVideoWrapperRef.current, {opacity: 0, duration: 2})
                .call(() => {
                    console.log("currentSrc: ", currentSrc);
                    dispatch(setPreviousSceneSrc(currentSrc));
                }, [], "-=2")
                .to(prevVideoWrapperRef.current, {opacity: 1, duration: 2}, "-=2");
        } else {
            timeline
                .to(prevVideoWrapperRef.current, {opacity: 0, duration: 2})
                .call(() => {
                    dispatch(setActiveSceneSrc(previousSrc));
                }, [], "-=2")
                .to(currentVideoWrapperRef.current, {opacity: 1, duration: 2}, "-=2");
        }
    };

    useEffect(() => {
        if (!firstRender) {
            let condition = false;
            if (nightModeClicked) {
                condition = nightMode;
            } else if (rainModeClicked) {
                console.log("rainModeClicked: ", rainModeClicked);
                condition = rainMode;
            }

            executeAnimation({
                condition: condition,
                previousSrc: activeSrc,
                currentSrc: getNewSrc()
            });

            dispatch(setNightModeClicked(false));
            dispatch(setRainModeClicked(false));
        } else {
            setFirstRender(false);
        }
    }, [nightMode, rainMode, scene]);

    return (
        <div className="absolute overflow-hidden inset-0 z-10">
            <video ref={currentVideoWrapperRef} src={`/public/assets/videos/${activeSrc}`}
                   autoPlay loop muted className="object-cover inset-0 absolute"/>
            <SceneButtons buttons={scene.buttons}/>
        </div>
    );
};

export default Scene;

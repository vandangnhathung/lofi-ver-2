// components/Scene/Scene.tsx
import React, {useEffect, useRef} from 'react';
import {SceneProps} from "@/components/Scene/Type";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {gsap} from "gsap";

const Scene: React.FC<{ scene: SceneProps }> = ({scene}) => {
    // States
    const nightMode = useSelector((state: RootState) => state.scene.nightMode);
    const [currentSceneSrc, setCurrentSceneSrc] = React.useState<string | undefined>(scene.src);

    // Refs
    const videoWrapperRef = useRef<HTMLDivElement>(null);

    const handleChangeSceneLoading = () => {
        if (nightMode) {
            setCurrentSceneSrc(scene?.srcNight);
            return;
        }
        setCurrentSceneSrc(scene.src);
    }

    // nightMode, Raining => change scene
    useEffect(() => {
        const timeline = gsap.timeline();

        timeline.to(videoWrapperRef.current, {opacity: 0.2, duration: 0.4})
            .call(() => handleChangeSceneLoading(), [])
            .to(videoWrapperRef.current, {opacity: 1, duration: 0.5});

    }, [nightMode])

    // Panel scene change => change scene
    useEffect(() => {
        handleChangeSceneLoading();
    }, [scene]);

    return (
        <div ref={videoWrapperRef} className={`absolute overflow-hidden inset-0 z-10`}>
            <video src={`/public/assets/videos/${currentSceneSrc}`} autoPlay loop muted
                   className="object-cover h-full w-full"/>
        </div>
    );
};

export default Scene;

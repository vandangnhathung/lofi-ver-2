// Scene.tsx
import React, {useEffect, useRef} from 'react';
import {SceneProps} from "@/components/Scene/Type";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import {gsap} from "gsap";
import SceneButtons from "@/components/Scene/SceneButtons/SceneButtons";

const Scene: React.FC<{ scene: SceneProps }> = ({scene}) => {
    // States
    const nightMode = useSelector((state: RootState) => state.scene.nightMode);
    const [currentSceneSrc, setCurrentSceneSrc] = React.useState<string | undefined>(scene.src);
    const [prevSceneSrc, setPrevSceneSrc] = React.useState<string | undefined>(currentSceneSrc);
    const [firstRender, setFirstRender] = React.useState<boolean>(true);

    // Refs
    const currentVideoWrapperRef = useRef<HTMLVideoElement>(null);
    const prevVideoWrapperRef = useRef<HTMLVideoElement>(null);

    const handleChangeSceneLoading = () => {
        setCurrentSceneSrc(scene.src);
    }

    useEffect(() => {
        if (!firstRender) {
            const timeline = gsap.timeline();

            if (nightMode) {
                // Fade out current video and fade in previous video
                timeline
                    .to(currentVideoWrapperRef.current, {opacity: 0, duration: 2})
                    .call(() => {
                        setPrevSceneSrc(scene?.srcNight);
                    }, [], "-=2")
                    .to(prevVideoWrapperRef.current, {opacity: 1, duration: 2}, "-=2")
            } else {
                // Fade out previous video and fade in current video
                timeline
                    .to(prevVideoWrapperRef.current, {opacity: 0, duration: 2})
                    .call(() => {
                        setCurrentSceneSrc(scene.src);
                    }, [], "-=2")
                    .to(currentVideoWrapperRef.current, {opacity: 1, duration: 2}, "-=2")
            }

        } else {
            setFirstRender(false);
        }
    }, [nightMode, prevSceneSrc]); // Watch for nightMode and prevSceneSrc changes

    // Update the scene source when the scene prop changes
    useEffect(() => {
        handleChangeSceneLoading();
    }, [scene]);

    return (
        <div className={`absolute overflow-hidden inset-0 z-10`}>
            <video ref={currentVideoWrapperRef} src={`/public/assets/videos/${currentSceneSrc}`} autoPlay loop muted
                   className="object-cover inset-0 absolute"/>
            <video ref={prevVideoWrapperRef} src={`/public/assets/videos/${prevSceneSrc}`} autoPlay loop muted
                   className="opacity-0 object-cover inset-0 absolute"/>
            <SceneButtons/>
        </div>
    );
};

export default Scene;

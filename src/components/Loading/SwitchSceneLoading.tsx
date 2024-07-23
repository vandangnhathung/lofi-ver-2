import React, {useEffect, useRef} from 'react';
import {gsap} from "gsap";
import {setLoadingScene} from "@/redux/reducers/loadingSlice";
import {useDispatch, useSelector} from "react-redux";
import PixelLoading from "@/components/Loading/PixelLoading/PixelLoading";
import {RootState} from "@/redux/store";
import {pixelLoadingFn} from "@/components/Loading/PixelLoading/pixelLoadingFn";

const SwitchSceneLoading = () => {
    const loadingScene = useSelector((state: RootState) => state.loading.loadingScene);

    const animationWrapper = useRef<HTMLDivElement>(null);
    const circleWrapperOverlayRef = useRef<HTMLDivElement>(null);
    const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
    blockRefs.current = [];

    const dispatch = useDispatch();
    const animationDuration = 0.5;

    useEffect(() => {
        const timeline = gsap.timeline({
            onComplete: () => {
                dispatch(setLoadingScene(false)); // Animation complete, hide loading
            }
        })
        // scene 1
        const label = 'scene1';
        timeline.addLabel(`${label}-start`)
            .to(circleWrapperOverlayRef.current, {opacity: 1, duration: 0});
        pixelLoadingFn({timeline, animationDuration, blockRefs, label});

        // scene 2
        timeline.addLabel(`scene2-start`, "+=0.2")
            .to(animationWrapper.current, {backgroundColor: "transparent", duration: 0});

    }, [loadingScene])


    return (
        (
            loadingScene &&
            (
                <div ref={animationWrapper}
                     className="fixed w-screen bg-black h-screen z-50 text-white pointer-events-none">
                    <PixelLoading blockRefs={blockRefs} ref={circleWrapperOverlayRef}/>
                </div>
            )
        )
    );
};

export default SwitchSceneLoading;
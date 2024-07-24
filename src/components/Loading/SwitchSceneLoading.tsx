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
        const label1 = 'scene1';
        timeline.addLabel(`${label1}-start`)
            .to(circleWrapperOverlayRef.current, {opacity: 1, duration: 0});
        pixelLoadingFn({timeline, animationDuration, blockRefs, label: label1, type: "in"});

        // timeline.to(animationWrapper.current, {backgroundColor: "transparent", duration: 0});


        // scene 2
        const label2 = 'scene2';
        timeline.addLabel(`scene2-start`, "+=0.2")
        pixelLoadingFn({timeline, animationDuration, blockRefs, label: label2, type: "out"});


    }, [loadingScene])


    return (
        (
            loadingScene &&
            (
                <div ref={animationWrapper}
                     className="fixed w-screen h-screen z-50 text-white pointer-events-none">
                    <PixelLoading blockRefs={blockRefs} ref={circleWrapperOverlayRef}/>
                </div>
            )
        )
    );
};

export default SwitchSceneLoading;
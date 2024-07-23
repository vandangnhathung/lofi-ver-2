import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@/redux/store';
import {gsap} from "gsap";
import {setLoading} from '@/redux/reducers/loadingSlice';
import {pixelLoadingFn} from "@/components/Loading/PixelLoading/pixelLoadingFn";
import PixelLoading from "@/components/Loading/PixelLoading/PixelLoading";

const Loading: React.FC = () => {
    const loading = useSelector((state: RootState) => state.loading.loading);
    const dispatch = useDispatch();
    const quote = "Life is like riding a bicycle. To keep your balance you must keep moving. - Albert Einstein";

    const circleRef = useRef<HTMLDivElement>(null);
    const circleWrapperRef = useRef<HTMLDivElement>(null);
    const circleWrapperOverlayRef = useRef<HTMLDivElement>(null);
    const scene2Ref = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const logoTextRef = useRef<HTMLDivElement>(null);
    const animationWrapper = useRef<HTMLDivElement>(null);
    const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
    blockRefs.current = [];

    const animationDuration = 0.5;

    useEffect(() => {
        if (loading) {
            const timeline = gsap.timeline({
                defaults: {ease: "power2.inOut", duration: animationDuration},
                onComplete: () => {
                    dispatch(setLoading(false)); // Animation complete, hide loading
                }
            });

            // scene 1
            timeline.to(circleWrapperRef.current, {y: 0})
                .to(circleRef.current, {scale: 55, duration: animationDuration})
                .to(circleRef.current, {opacity: 0, duration: 0})
                .to(circleWrapperOverlayRef.current, {opacity: 1, duration: 0})
                .to(animationWrapper.current, {backgroundColor: "transparent", duration: 0});

            // scene 2
            timeline.addLabel("scene2-start", "+=0.2")
                .to(logoRef.current, {opacity: 1, duration: animationDuration}, "scene2-start")
                .to(logoRef.current, {scale: 1, duration: animationDuration})
                .to(logoRef.current, {y: -40, duration: animationDuration + 0.2, transition: "power2.inOut"})
                .to(logoTextRef.current, {opacity: 1, duration: animationDuration + 0.3}, "-=0.5")
                .to(logoTextRef.current, {y: 0, duration: animationDuration + 0.6, transition: "power2.inOut"}, "-=1");

            // scene 3
            timeline.addLabel(`scene3-start`, "+=1")
                .to(scene2Ref.current, {opacity: 0, duration: animationDuration}, "scene3-start");

            // scene 4
            const label = 'scene4';
            timeline.addLabel(`${label}-start`, "-=0.3");
            pixelLoadingFn({timeline, animationDuration, blockRefs, label});

        }
    }, [loading, animationDuration, dispatch]);

    return (
        <>
            {loading && (
                <div
                    ref={animationWrapper}
                    className="fixed w-screen bg-white h-screen z-50 text-white pointer-events-none"
                >
                    <div className="scene1 absolute inset-0 z-10">
                        <div ref={circleWrapperRef} className="h-full translate-y-[60%]">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div ref={circleRef} className="bg-black w-[3vw] h-[3vw] rounded-full"></div>
                            </div>
                        </div>
                        <PixelLoading blockRefs={blockRefs} ref={circleWrapperOverlayRef}/>
                    </div>
                    <div ref={scene2Ref} className="scene2 absolute inset-0 z-20">
                        <div
                            className="absolute w-[450px] px-2 max-w-full text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center">
                            <div ref={logoRef} className="opacity-0 w-[250px] scale-[150%] aspect-square">
                                <img className="w-full h-full object-contain" src="/logo/logo-lofi.gif" alt="Logo"/>
                            </div>
                            <div ref={logoTextRef}
                                 className="-translate-y-[120%] opacity-0 absolute bottom-[20%] left-0 w-full">
                                <span>"{quote}"</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Loading;

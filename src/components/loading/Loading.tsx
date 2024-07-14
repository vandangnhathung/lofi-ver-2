import React, {useEffect, useRef} from 'react';
import {gsap} from "gsap";

const Loading: React.FC = () => {
    // quote
    const quote = "Life is like riding a bicycle. To keep your balance you must keep moving. - Albert Einstein";

    // scene 1: ref
    const circleRef = useRef<HTMLDivElement>(null);
    const circleWrapperRef = useRef<HTMLDivElement>(null);
    const circleWrapperOverlayRef = useRef<HTMLDivElement>(null);

    // scene 2: ref
    const scene2Ref = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const logoTextRef = useRef<HTMLDivElement>(null);

    // scene 4
    const animationWrapper = useRef<HTMLDivElement>(null);

    const animationDuration = 0.5; // Adjust this value to make the animation faster or slower
    const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
    blockRefs.current = [];

    const addToBlockRefs = (el: HTMLDivElement) => {
        if (el && !blockRefs.current.includes(el)) {
            blockRefs.current.push(el);
        }
    };


    /**
     * Shuffles array in place (Fisher–Yates shuffle).
     * @param {Array<any>} a items An array containing the items.
     */
    const shuffle = <T, >(a: T[]): T[] => {
        let j: number, x: T, i: number;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    };

    const getBlocks = (): React.ReactNode => {
        const {innerWidth, innerHeight} = window;
        const blockSize = innerWidth * 0.05;
        const amountOfBlocks = Math.ceil(innerHeight / blockSize);

        const delays = shuffle([...Array(amountOfBlocks)].map((_, i) => i));
        return delays.map((randomDelay, i) => {
            return <div key={i} ref={addToBlockRefs} data-random-delay={randomDelay.toString()}
                        className="w-full h-[5vw] bg-black"></div>
        });
    }


    useEffect(() => {
        // create a timeline
        const timeline = gsap.timeline({defaults: {ease: "power2.inOut", duration: animationDuration}});

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
        timeline.addLabel("scene4-start", "-=0.3");
        const shuffledBlockRefs = shuffle([...blockRefs.current]);
        shuffledBlockRefs.forEach((block, i) => {
            const randomDelay = parseFloat(block?.dataset.randomDelay || "0");
            timeline.to(block, {
                opacity: 0,
                duration: animationDuration
            }, `scene4-start+=${randomDelay * 0.1}`);
        });

    }, [animationDuration]);


    return (
        <div ref={animationWrapper} className="fixed w-screen bg-white h-screen z-20 text-white pointer-events-none">
            {/* scene 1 */}
            <div className="scene1 absolute inset-0 z10">
                <div ref={circleWrapperRef} className="h-full translate-y-[60%]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div ref={circleRef} className="bg-black w-[3vw] h-[3vw] rounded-full"></div>
                    </div>
                </div>
                {/* scene 4 - Pixel background */}
                <div ref={circleWrapperOverlayRef} className="absolute opacity-0 inset-0 flex">
                    {[...Array(20)].map((_, i) => {
                        return <div key={i} className="w-[5vw] h-full">
                            {getBlocks()}
                        </div>
                    })}
                </div>
            </div>

            {/*  scene 2  */}
            <div ref={scene2Ref} className="scene2 absolute inset-0 z20">
                <div
                    className="absolute w-[450px] px-2 max-w-full text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center">
                    <div ref={logoRef} className="opacity-0 w-[250px] scale-[150%] aspect-square">
                        <img className="w-full h-full object-contain" src="../../../public/logo/logo-lofi.gif" alt=""/>
                    </div>
                    <div ref={logoTextRef}
                         className="-translate-y-[120%] opacity-0  absolute bottom-[20%] left-0 w-full">
                        <span>"{quote}"</span>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Loading;

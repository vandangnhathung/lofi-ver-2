import React, {useRef} from 'react';
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

const Loading: React.FC = () => {

    // quote
    const quote = "Life is like riding a bicycle. To keep your balance you must keep moving. - Albert Einstein";

    // scene 1: ref
    const circleRef = useRef(null);
    const circleWrapperRef = useRef(null);

    // scene 2: ref
    const logoRef = useRef(null);
    const logoTextRef = useRef(null);

    useGSAP(() => {
        // create a timeline
        const timeline = gsap.timeline({defaults: {ease: "power2.inOut", duration: 1}});

        // scene 1
        timeline.to(circleWrapperRef.current, {y: 0})
            .to(circleRef.current, {scale: 55, duration: 0.5});

        // scene 2
        timeline.addLabel("scene2-start", "+=0.2")
            .to(logoRef.current, {opacity: 1, duration: 0.5}, "scene2-start")
            .to(logoRef.current, {scale: 1, duration: 0.5})
            .to(logoRef.current, {y: -20, duration: 0.5})
            .to(logoTextRef.current, {opacity: 1, duration: 0.6}, "-=0.5")
            .to(logoTextRef.current, {y: 0, duration: 1}, "-=1");
    })

    return (
        <div className="fixed w-screen bg-white h-screen z-20 text-white">
            {/* scene 1 */}
            <div className="scene1 absolute inset-0 z10">
                <div ref={circleWrapperRef} className="h-full translate-y-[60%]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div ref={circleRef} className="bg-black w-[3vw] h-[3vw] rounded-full"></div>
                    </div>
                </div>
            </div>

            {/*  scene 2  */}
            <div className="scene2 absolute inset-0 z20">
                <div
                    className="absolute w-[450px] px-2 max-w-full text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 items-center">
                    <div ref={logoRef} className="opacity-0 w-[250px] scale-[150%] aspect-square">
                        <img className="w-full h-full object-contain" src="../../../public/logo/logo-lofi.gif" alt=""/>
                    </div>
                    <div ref={logoTextRef}
                         className="-translate-y-[110%] opacity-0  absolute bottom-[20%] left-0 w-full">
                        <span>"{quote}"</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;

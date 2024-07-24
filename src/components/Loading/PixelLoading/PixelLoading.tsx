import React, {useEffect, useRef} from 'react';
import {shuffle} from 'lodash';
import {gsap} from 'gsap';
import {useDispatch, useSelector} from "react-redux";
import {setAnimation, setSceneComplete} from "@/redux/reducers/sceneSlice";
import {RootState} from "@/redux/store";

const PixelLoading = ({status}: { status?: "in" | "out" | 'complete' }) => {
    console.log("PixelLoading work", status);
    const dispatch = useDispatch();
    const animation = useSelector((state: RootState) => state.scene.animation);
    const scene = useSelector((state: RootState) => state.scene.scene);
    const layerWrapperRef = useRef<HTMLDivElement | null>(null);
    const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
    blockRefs.current = [];

    const addToBlockRefs = (el: HTMLDivElement | null) => {
        if (el && !blockRefs.current.includes(el)) {
            blockRefs.current.push(el);
        }
    };

    const {innerWidth, innerHeight} = window;
    const blockSize = innerWidth * 0.05;
    const amountOfBlocks = Math.ceil(innerHeight / blockSize);

    useEffect(() => {
        const timeline = gsap.timeline(
            {
                onComplete: () => {
                    if (animation === 'out') {
                        dispatch(setSceneComplete(scene));
                        dispatch(setAnimation('in'));
                    }
                }
            }
        );
        const shuffledBlockRefs = shuffle([...blockRefs.current]);
        const randomPosition = gsap.utils.random(0, (shuffledBlockRefs.length - 1) * 0.00001);

        timeline.to(layerWrapperRef.current, {opacity: 1, duration: 0})
        shuffledBlockRefs.forEach(block => {
            timeline.to(block, {
                opacity: status === 'out' ? 1 : 0,
                duration: 0.008,
                backgroundColor: status === 'out' ? "black" : ""
            }, `+=${randomPosition * 0.00001}`);
        });
    }, [status]);

    return (
        <div ref={layerWrapperRef} className="absolute opacity-0 inset-0 flex z-20 pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="w-[5vw] h-full">
                    {[...Array(amountOfBlocks)].map((_, j) => (
                        <div
                            key={j}
                            ref={addToBlockRefs}
                            className="w-full h-[5vw] bg-transparent"
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default PixelLoading;

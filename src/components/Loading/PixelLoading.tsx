import React, {useEffect, useRef} from 'react';
import {shuffle} from 'lodash';
import {gsap} from 'gsap';
import {useDispatch, useSelector} from "react-redux";
import {setAnimation, setActiveScene} from "@/redux/reducers/sceneSlice";
import {RootState} from "@/redux/store";
import {setLoading, setLoadingScene} from "@/redux/reducers/loadingSlice";

const PixelLoading = ({status, duration}: { status?: "in" | "out" | 'complete', duration: number }) => {
    const dispatch = useDispatch();
    const loadingScene = useSelector((state: RootState) => state.loading.loadingScene);
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
                        dispatch(setActiveScene(scene));
                        dispatch(setAnimation('in'));
                        dispatch(setLoading(false)); // Animation complete, hide loading
                        dispatch(setLoadingScene(false));
                    }
                }
            }
        );
        const shuffledBlockRefs = shuffle([...blockRefs.current]);
        const uniqueRandomIndices = gsap.utils.shuffle(Array.from({length: shuffledBlockRefs.length}, (_, i) => i));

        timeline.to(layerWrapperRef.current, {opacity: 1, duration: 0});
        shuffledBlockRefs.forEach((block, index) => {
            const randomPosition = uniqueRandomIndices[index];
            timeline.fromTo(block, {
                opacity: status === 'out' ? 0 : 1,
                backgroundColor: status === 'out' ? "" : "black"
            }, {
                opacity: status === 'out' ? 1 : 0,
                duration,
                backgroundColor: status === 'out' ? "black" : ""
            }, `+=${randomPosition * 0.00004}`);
        });
    }, [status]);

    return (
        <div ref={layerWrapperRef}
             className={`absolute opacity-0 inset-0 flex z-20 ${loadingScene ? '' : 'pointer-events-none'}`}>
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

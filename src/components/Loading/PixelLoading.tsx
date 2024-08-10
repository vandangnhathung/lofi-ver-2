import React, {useCallback, useEffect, useRef} from 'react';
import {shuffle} from 'lodash';
import {gsap} from 'gsap';
import {useDispatch, useSelector} from "react-redux";
import {setActiveScene, setAnimation} from "@/redux/reducers/sceneSlice";
import {RootState} from "@/redux/store";
import {setLoadingScene} from "@/redux/reducers/loadingSlice";
import {setChosenTheme} from "@/redux/reducers/themeSlice";
import useBreakpoint from "@/hooks/useBreakpoint";

const PixelLoading = ({status, duration}: { status?: "in" | "out" | "complete", duration: number }) => {
    const dispatch = useDispatch();
    const loadingScene = useSelector((state: RootState) => state.loading.loadingScene);
    const animation = useSelector((state: RootState) => state.scene.animation);
    const {chosenThemeObjectPanel} = useSelector((state: RootState) => state.themes);
    const scene = useSelector((state: RootState) => state.scene.scene);

    const layerWrapperRef = useRef<HTMLDivElement | null>(null);
    const blockRefs = useRef<Array<HTMLDivElement | null>>([]);
    const {isMobile} = useBreakpoint();
    const {innerWidth, innerHeight} = window;

    const blockSize = innerWidth * 0.05;
    const amountOfBlocks = Math.ceil(innerHeight / blockSize);

    const addToBlockRefs = useCallback((el: HTMLDivElement | null) => {
        if (el && !blockRefs.current.includes(el)) {
            blockRefs.current.push(el);
        }
    }, []);

    const handleAnimationComplete = useCallback(() => {
        if (animation === 'out') {
            dispatch(setChosenTheme(chosenThemeObjectPanel!));
            dispatch(setActiveScene(scene));
            dispatch(setAnimation('in'));
            dispatch(setLoadingScene(false)); // Animation complete, hide loading
        }
    }, [animation, dispatch, chosenThemeObjectPanel, scene]);

    useEffect(() => {
        const timeline = gsap.timeline({onComplete: handleAnimationComplete});
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
            }, `+=${getTimelineDelay(randomPosition, isMobile)}`);
        });
    }, [status, handleAnimationComplete, isMobile, duration]);

    const getTimelineDelay = (randomPosition: number, isMobile: boolean) => {
        return isMobile ? randomPosition * 0.000009 : randomPosition * 0.00004;
    };

    const renderBlocks = () => {
        return [...Array(20)].map((_, i) => (
            <div key={i} className={`${isMobile ? 'w-[40vh]' : 'w-[5vw]'} h-full`}>
                {[...Array(amountOfBlocks)].map((_, j) => (
                    <div
                        key={j}
                        ref={addToBlockRefs}
                        className={`w-full ${isMobile ? 'h-[5vh]' : 'h-[5vw]'} bg-transparent`}
                    ></div>
                ))}
            </div>
        ));
    };

    return (
        <div ref={layerWrapperRef}
             className={`absolute opacity-0 inset-0 flex z-20 ${loadingScene ? '' : 'pointer-events-none'}`}>
            {renderBlocks()}
        </div>
    );
};

export default PixelLoading;

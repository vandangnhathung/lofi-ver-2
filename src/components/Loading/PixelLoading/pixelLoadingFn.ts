import {gsap} from "gsap";
import {shuffle} from "@/helpers";
import React from "react";

interface PixelLoadingParams {
    timeline: gsap.core.Timeline;
    animationDuration: number;
    blockRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
    label: string
}

export const pixelLoadingFn = ({timeline, animationDuration, blockRefs, label}: PixelLoadingParams) => {
    const shuffledBlockRefs = shuffle([...blockRefs.current]);
    shuffledBlockRefs.forEach(block => {
        const randomDelay = parseFloat(block?.dataset.randomDelay || "0");
        timeline.to(block, {
            opacity: 0,
            duration: animationDuration
        }, `${label}-start+=${randomDelay * 0.1}`);
    });
};

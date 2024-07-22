import {gsap} from "gsap";
import {shuffle} from "@/helpers";
import React from "react";

interface PixelLoadingParams {
    timeline: gsap.core.Timeline;
    animationDuration: number;
    blockRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const pixelLoading = ({timeline, animationDuration, blockRefs}: PixelLoadingParams) => {
    const shuffledBlockRefs = shuffle([...blockRefs.current]);
    shuffledBlockRefs.forEach(block => {
        const randomDelay = parseFloat(block?.dataset.randomDelay || "0");
        timeline.to(block, {
            opacity: 0,
            duration: animationDuration
        }, `scene4-start+=${randomDelay * 0.1}`);
    });
};

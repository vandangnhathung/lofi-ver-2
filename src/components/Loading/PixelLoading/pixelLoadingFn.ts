import {gsap} from "gsap";
import {shuffle} from "@/helpers";
import React from "react";

interface PixelLoadingParams {
    timeline: gsap.core.Timeline;
    animationDuration: number;
    blockRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
    label: string
    type: "in" | "out"
}

export const pixelLoadingFn = ({timeline, animationDuration, blockRefs, label, type}: PixelLoadingParams) => {
    const shuffledBlockRefs = shuffle([...blockRefs.current]);
    shuffledBlockRefs.forEach(block => {
        const randomDelay = parseFloat(block?.dataset.randomDelay || "0");
        timeline.to(block, {
            opacity: type === 'in' ? 1 : 0,
            duration: animationDuration,
            backgroundColor: type === 'in' ? "black" : ""
        }, `${label}-start+=${randomDelay * 0.1}`);
    });
};
//
// shuffledBlockRefs.forEach(block => {
//     const randomDelay = parseFloat(block?.dataset.randomDelay || "0");
//     timeline.to(block, {
//         opacity: 1,
//         duration: animationDuration,
//         backgroundColor: "black"
//     }, `${label}-start+=${randomDelay * 0.1}`);
// });
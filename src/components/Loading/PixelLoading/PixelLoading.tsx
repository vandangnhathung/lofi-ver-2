import React, {forwardRef, MutableRefObject} from 'react';
import {shuffle} from "@/helpers";

interface PixelLoadingProps {
    blockRefs: MutableRefObject<(HTMLDivElement | null)[]>;
}

const PixelLoading = forwardRef<HTMLDivElement, PixelLoadingProps>(({blockRefs}, ref) => {
    const addToBlockRefs = (el: HTMLDivElement) => {
        if (el && !blockRefs.current.includes(el)) {
            blockRefs.current.push(el);
        }
    };

    const getBlocks = (): React.ReactNode => {
        const {innerWidth, innerHeight} = window;
        const blockSize = innerWidth * 0.05;
        const amountOfBlocks = Math.ceil(innerHeight / blockSize);

        const delays = shuffle([...Array(amountOfBlocks)].map((_, i) => i));
        return delays.map((randomDelay, i) => (
            <div
                key={i}
                ref={addToBlockRefs}
                data-random-delay={randomDelay.toString()}
                className="w-full h-[5vw] bg-transparent"
            ></div>
        ));
    };

    return (
        <div ref={ref} className="absolute opacity-0 inset-0 flex">
            {[...Array(20)].map((_, i) => (
                <div key={i} className="w-[5vw] h-full">
                    {getBlocks()}
                </div>
            ))}
        </div>
    );
});

export default PixelLoading;

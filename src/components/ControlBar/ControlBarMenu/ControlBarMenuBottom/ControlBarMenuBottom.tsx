import React, {useLayoutEffect, useRef, useState} from "react";
import BackgroundNoiseList from "@/components/ControlBar/ControlBarMenu/ControlBarMenuBottom/BackgroundNoiseList";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const ControlBarMenuBottom = () => {
    const mixMore = useSelector(
        (state: RootState) => state.backgroundSound.mixMore
    );
    const noisePriorityItemsRef = useRef<NodeListOf<Element> | null>(null);
    const noisePriorityItemRef = useRef<Element | null>(null);

    const [noisePriorityItemHeight, setNoisePriorityItemHeight] = useState<
        string | null
    >(null);
    const activeScene = useSelector((state: RootState) => state.scene.activeScene);

    useLayoutEffect(() => {
        noisePriorityItemsRef.current = document.querySelectorAll(
            ".noise-priority-Item"
        );
        noisePriorityItemRef.current = document.querySelector(
            ".noise-priority-Item"
        );

        if (noisePriorityItemRef.current && noisePriorityItemsRef.current) {
            const totalHeight =
                noisePriorityItemRef.current.clientHeight *
                noisePriorityItemsRef.current.length + 120;
            mixMore
                ? setNoisePriorityItemHeight("40vh")
                : setNoisePriorityItemHeight(totalHeight + "px");
        }
    }, [mixMore, activeScene]);

    return (
        <div
            className="glass-card overflow-y-auto transition-all duration-300 pt-1 pr-2  pb-control-bar-height"
            // Provide a fallback value for the height when noisePriorityItemHeight is null
            style={{height: noisePriorityItemHeight ?? "auto"}}
        >
            <h3 className="mb-2 uppercase pt-2 pl-3 pr-3 relative z-20">
                Background noise
            </h3>

            <div className="relative z-30">
                <BackgroundNoiseList/>
            </div>
        </div>
    );
};

export default ControlBarMenuBottom;

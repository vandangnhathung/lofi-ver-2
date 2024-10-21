import React, {Suspense, useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import categories from "@/assets/data/categories.json";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import {setCurrentSong} from "@/redux/reducers/playerMusicSlice";
import IconChill from "@/components/ControlBar/assets/icons//IconChill";
import IconJazzy from "@/components/ControlBar/assets/icons/IconJazzy";
import IconSleep from "@/components/ControlBar/assets/icons/IconSleep";

const ControlMusicList: React.FC = () => {
    const IconArray = [IconChill, IconJazzy, IconSleep];
    const IconMap: { [key: string]: React.ComponentType<any> } = {
        IconChill,
        IconJazzy,
        IconSleep
    };
    const categorizedMusics = useSelector((state: RootState) => state.playerMusic.categorizedMusics);
    const dispatch = useDispatch();
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const currentSong = useSelector((state: RootState) => state.playerMusic.currentSong);

    const handleMouseEnter = useCallback((categoryName: string) => {
        setHoveredCategory(categoryName);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredCategory(null);
    }, []);

    const getIconComponent = (src: number | string) => {
        if (typeof src === 'number') {
            return IconArray[src];
        } else if (typeof src === 'string') {
            return IconMap[src] || IconChill; // Default to IconChill if not found
        }
        return IconChill; // Default icon
    };

    return (
        <div className="flex gap-4 justify-between">
            {categories.map((category, index) => {
                const IconComponent = getIconComponent(category.src);
                return (
                    <div
                        key={index}
                        className={`group cursor-pointer w-1/3 flex flex-col gap-y-1 items-center ${currentSong.category[0] === category.name ? "pointer-events-none" : ""}`}
                        onMouseEnter={() => handleMouseEnter(category.name)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => {
                            dispatch(setCurrentSong(categorizedMusics[category.name][0]));
                        }}
                    >
                        <div className="w-full aspect-square rounded-full backdrop-blur-[10px] relative">
                            <div
                                className="relative z-20 flex items-center justify-center h-full">
                                <Suspense fallback={<SkeletonLoading/>}>
                                    <IconComponent
                                        color={hoveredCategory === category.name || currentSong.category[0] === category.name ? "#ffb70b" : "#c3c3c3"}
                                        className={`w-[35px] aspect-square`}
                                    />
                                </Suspense>
                            </div>

                            {/* icon hover effect */}
                            <div
                                className={`z-10 bg-[rgba(255,255,255,0.2)] opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full inset-0 w-[35px] aspect-square`}></div>
                        </div>
                        <p className="ta-center">{category.name}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default ControlMusicList;

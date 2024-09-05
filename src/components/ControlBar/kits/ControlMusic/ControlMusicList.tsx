import React, {lazy, Suspense, useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import categories from "@/assets/data/categories.json";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import {setCurrentSong} from "@/redux/reducers/playerMusicSlice";
import {createSelector} from 'reselect';

// Define the props type for the icons
interface IconProps {
    color?: string;
    className?: string;
}

// Utility function to dynamically import icons
const loadIcon = (iconName: string) =>
    lazy(() =>
        import(`../../assets/icons/${iconName}`).then(module => {
            const IconComponent = module.default as React.FC<IconProps>;
            return {default: IconComponent};
        })
    );

// Selector for currentSong
const selectCurrentSong = createSelector(
    (state: RootState) => state.playerMusic.currentSong,
    (currentSong) => currentSong
);

const CategoryComponent: React.FC<{
    category: typeof categories[0];
    isActive: boolean;
    onClick: () => void;
    hoveredCategory: string | null;
    handleMouseEnter: (categoryName: string) => void;
    handleMouseLeave: () => void;
    getIconComponent: (src: string) => React.LazyExoticComponent<React.FC<IconProps>>;
}> = React.memo(({
                     category,
                     isActive,
                     onClick,
                     hoveredCategory,
                     handleMouseEnter,
                     handleMouseLeave,
                     getIconComponent
                 }) => {
    const IconComponent = getIconComponent(category.src);
    return (
        <div
            className={`group cursor-pointer w-1/3 flex flex-col gap-y-1 items-center ${isActive ? "pointer-events-none" : ""}`}
            onMouseEnter={() => handleMouseEnter(category.name)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            <div className="w-full aspect-square rounded-full backdrop-blur-[10px] relative">
                <div className="relative z-20 flex items-center justify-center h-full">
                    <Suspense fallback={<SkeletonLoading/>}>
                        <IconComponent
                            color={hoveredCategory === category.name || isActive ? "#ffb70b" : "#c3c3c3"}
                            className="w-[35px] aspect-square"
                        />
                    </Suspense>
                </div>
                <div
                    className={`z-10 bg-[rgba(255,255,255,0.2)] opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full inset-0 w-[35px] aspect-square`}></div>
            </div>
            <p className="ta-center">{category.name}</p>
        </div>
    );
});

const ControlMusicList: React.FC = () => {
    const musics = useSelector((state: RootState) => state.playerMusic.musics);
    const categorizedMusics = useSelector((state: RootState) => state.playerMusic.categorizedMusics);
    const dispatch = useDispatch();

    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [loadedIcons, setLoadedIcons] = useState<{
        [key: string]: React.LazyExoticComponent<React.FC<IconProps>>
    }>({});

    const currentSong = useSelector(selectCurrentSong);

    const handleMouseEnter = useCallback((categoryName: string) => {
        setHoveredCategory(categoryName);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredCategory(null);
    }, []);

    const getIconComponent = useMemo(() => (src: string) => {
        if (loadedIcons[src]) {
            return loadedIcons[src];
        }

        const IconComponent = loadIcon(src);
        setLoadedIcons(prevState => ({...prevState, [src]: IconComponent}));

        return IconComponent;
    }, [loadedIcons]);

    return (
        <div className="flex gap-4 justify-between">
            {categories.map((category, index) => {
                const isActive = currentSong.category[0] === category.name;
                return (
                    <CategoryComponent
                        key={index}
                        category={category}
                        isActive={isActive}
                        onClick={() => {
                            dispatch(setCurrentSong(categorizedMusics[category.name][0]));
                        }}
                        hoveredCategory={hoveredCategory}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        getIconComponent={getIconComponent}
                    />
                );
            })}
        </div>
    );
};

export default React.memo(ControlMusicList);

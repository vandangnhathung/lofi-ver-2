// ControlMusicList.tsx
import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import categories from "@/assets/data/categories.json";
import {setCurrentSong} from "@/redux/reducers/playerMusicSlice";

interface IconProps {
    color?: string;
    className?: string;
    src: string;
}

const resolvePath = (path: string) => {
    if (import.meta.env.PROD) {
        return new URL(`/lofi-ver-2/${path}`, import.meta.url).href;
    }
    return new URL(`../../${path}`, import.meta.url).href;
};

const IconComponent: React.FC<IconProps> = ({src, color, className}) => {
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        fetch(resolvePath(`assets/icons/${src}`))
            .then(response => response.text())
            .then(data => {
                const coloredSvg = color ? data.replace(/fill="[^"]*"/g, `fill="${color}"`) : data;
                setSvgContent(coloredSvg);
            })
            .catch(error => console.error('Error loading SVG:', error));
    }, [src, color]);

    if (!svgContent) {
        return <div>Loading...</div>;
    }

    return <div className={className} dangerouslySetInnerHTML={{__html: svgContent}}/>;
};

const ControlMusicList: React.FC = () => {
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

    return (
        <div className="flex gap-4 justify-between">
            {categories.map((category, index) => (
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
                        <div className="relative z-20 flex items-center justify-center h-full">
                            <IconComponent
                                src={category.src}
                                color={hoveredCategory === category.name || currentSong.category[0] === category.name ? "#ffb70b" : "#c3c3c3"}
                                className={`w-[35px] aspect-square`}
                            />
                        </div>
                        <div
                            className={`z-10 bg-[rgba(255,255,255,0.2)] opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-500 ease-in-out absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full inset-0 w-[35px] aspect-square`}></div>
                    </div>
                    <p className="ta-center">{category.name}</p>
                </div>
            ))}
        </div>
    );
};

export default ControlMusicList;

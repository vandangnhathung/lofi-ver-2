import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import categories from "@/assets/data/categories.json";

const ControlMusicList = () => {
    const musics = useSelector((state: RootState) => state.playerMusic.musics);
    const categorizedMusics = useSelector((state: RootState) => state.playerMusic.categorizedMusics);
    // console.log("categories: ", categories, "categorizedMusics: ", categorizedMusics);

    return (
        <div className="flex gap-4 justify-between">
            {categories.map((category, index) => (
                <div key={index} className={`w-1/3 aspect-square rounded-full bg-red-500`}>
                    <div className={`flex items-center justify-center grayscale h-full`}>
                        <img className={`w-[35px] aspect-square backdrop-grayscale-0`}
                             src={`/assets/icons/${category.src}`} alt=""/>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ControlMusicList;

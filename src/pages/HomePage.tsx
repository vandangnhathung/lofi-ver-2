// components/HomePage.tsx
import React from 'react';
import Scene from '@/components/Scene/Scene';
import MenuBar from "@/components/MenuBar/MenuBar";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

const HomePage: React.FC = () => {
    const activeScene = useSelector((state: RootState) => state.scene.activeScene);

    return (
        <>
            {/* decide height of the website */}
            <div className={`relative w-screen h-screen z-10`}>
                <div className={`bg-black absolute inset-0`}></div>
                <Scene activeScene={activeScene}/>
                <MenuBar/>
            </div>
        </>
    );
};

export default HomePage;

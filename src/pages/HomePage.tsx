import React from 'react';
import CustomVideo from '../components/CustomVideo/CustomVideo';
import musics from "../assets/data/musics.json";
import ExteriorDay from "../assets/videos/ExteriorDay.mp4";
import MenuBar from "../components/MenuBar/MenuBar";

const HomePage: React.FC = () => {
    console.log(musics);

    return (
        <>
            <div className={`relative w-screen h-screen`}>
                <CustomVideo src={ExteriorDay}/>
                <MenuBar/>
            </div>
        </>
    );
};

export default HomePage;
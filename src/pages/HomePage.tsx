import React from 'react';
import universe from '../assets/videos/Universe.mp4';
import CustomVideo from '../components/CustomVideo/CustomVideo';
import musics from "../assets/data/musics.json";
import MenuBar from "../components/MenuBar/MenuBar";

const HomePage: React.FC = () => {
    console.log(musics);

    return (
        <>
            <CustomVideo src={universe}/>
            <MenuBar/>
        </>
    );
};

export default HomePage;
import React from 'react';
import CustomVideo from '@/components/CustomVideo/CustomVideo';
import ExteriorDay from "@/assets/videos/ExteriorDay.mp4";
import MenuBar from "@/components/MenuBar/MenuBar";
import {useDispatch} from "react-redux";
import {pause, play} from "@/redux/reducers/playerMusicSlice";

const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    return (
        <>
            {/* decide height of the website */}
            <div className={`relative w-screen h-screen`}>
                <button onClick={() => dispatch(pause())}
                        className={`w-10 h-10 z-40 bg-black text-white absolute top-1/2 translate-x-1/2`}>Click here to
                    pause music
                </button>

                <CustomVideo src={ExteriorDay}/>
                <MenuBar/>

            </div>
        </>
    );
};

export default HomePage;
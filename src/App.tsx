import HomePage from "./pages/HomePage";
import React from "react";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PixelLoading from "@/components/Loading/PixelLoading";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";

function App() {
    const animation = useSelector((state: RootState) => state.scene.animation);

    return (
        <>
            <AudioPlayer/>
            {/*<Loading></Loading>*/}
            {/*<SwitchSceneButtonLoading/>*/}

            <div className="relative overflow-hidden">
                <PixelLoading duration={0.0000001} status={animation}/>
                <HomePage/>
            </div>
            {/*<UserComponent></UserComponent>*/}
        </>
    )
}

export default App

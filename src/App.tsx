import HomePage from "./pages/HomePage";
import React from "react";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import Loading from "@/components/Loading/Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
    return (
        <>
            <AudioPlayer/>
            {/*<Loading></Loading>*/}
            <div className="relative">
                <HomePage/>
            </div>
        </>
    )
}

export default App

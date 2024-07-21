import HomePage from "./pages/HomePage";
import React from "react";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";

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

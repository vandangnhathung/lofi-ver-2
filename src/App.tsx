import HomePage from "./pages/HomePage";
import Loading from "./components/Loading/Loading";
import ReactAudioPlayer from "react-audio-player";

function App() {

    return (
        <>
            {/*<Loading></Loading>*/}
            <div className="relative">
                <HomePage></HomePage>
            </div>
        </>
    )
}

export default App

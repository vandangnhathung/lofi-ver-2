import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import AudioNoiseSoundList from "@/components/AudioPlayer/AudioNoiseSoundList";
import PixelLoading from "@/components/Loading/PixelLoading";
import HomePage from "@/pages/HomePage/HomePage";
import ControlBarMenu from "@/components/ControlBar/ControlBarMenu/ControlBarMenu";
import MenuBar from "@/components/MenuBar/MenuBar";
import SpotifyIframe from "@/components/SpotifyMenu/SpotifyIframe";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import Loading from "@/components/Loading/Loading";
import useBreakpoint from "@/hooks/useBreakpoint";

const HomePageWrapper = () => {
    const animation = useSelector((state: RootState) => state.scene.animation);
    const {isDesktop} = useBreakpoint();

    return (
        <>
            <AudioPlayer/>
            <AudioNoiseSoundList/>
            {isDesktop && <Loading/>}

            <div className="overflow-hidden relative">
                    <PixelLoading duration={0.0000001} status={animation}/>
                    <HomePage>
                    </HomePage>
                    <ControlBarMenu/>
                    <MenuBar/>
                    <SpotifyIframe/>
            </div>
        </>
    );
};

export default HomePageWrapper;
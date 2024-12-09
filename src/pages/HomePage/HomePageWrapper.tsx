import {useState} from 'react';
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import AudioNoiseSoundList from "@/components/AudioPlayer/AudioNoiseSoundList";
import {DndContext} from "@dnd-kit/core";
import PixelLoading from "@/components/Loading/PixelLoading";
import HomePage from "@/pages/HomePage/HomePage";
import ControlBarMenu from "@/components/ControlBar/ControlBarMenu/ControlBarMenu";
import MenuBar from "@/components/MenuBar/MenuBar";
import SpotifyIframe from "@/components/SpotifyMenu/SpotifyIframe";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import WeatherTracking from "@/components/WeatherTracking/WeatherTracking";
// import Loading from "@/components/Loading/Loading";
// import {useBreakpoint} from "@/hooks/useBreakpoint";

const HomePageWrapper = () => {
    const animation = useSelector((state: RootState) => state.scene.animation);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDropped, setIsDropped] = useState<boolean>(false);

    // const {isDesktop} = useBreakpoint();


    function handleDragEnd(event: any) {
        if (event.over && event.over.id === 'droppable') {
            const {x, y} = event.delta;
            setPosition(prevPosition => ({
                x: prevPosition.x + x,
                y: prevPosition.y + y
            }));
            setIsDropped(true);
        }
    }


    const draggableMarkup = (
        <div style={{
            position: 'absolute',
            left: position.x || '50%',
            top: position.y || '50%',
        }}>
            <WeatherTracking/>
        </div>
    );

    return (
        <>
            <AudioPlayer/>
            <AudioNoiseSoundList/>
            {/*{isDesktop && <Loading></Loading>}*/}

            <div className="relative overflow-hidden">
                <DndContext onDragEnd={handleDragEnd}>
                    <PixelLoading duration={0.0000001} status={animation}/>
                    {!isDropped ? draggableMarkup : null}
                    <HomePage>
                        {isDropped ? draggableMarkup : 'Drop here'}
                    </HomePage>
                    <ControlBarMenu/>
                    <MenuBar/>
                    <SpotifyIframe/>
                </DndContext>
            </div>
        </>
    );
};

export default HomePageWrapper;
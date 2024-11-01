import HomePage from "./pages/HomePage";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PixelLoading from "@/components/Loading/PixelLoading";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import ControlBarMenu from "@/components/ControlBar/ControlBarMenu/ControlBarMenu";
import {createTheme, ThemeProvider} from "@mui/material";
import AudioNoiseSoundList from "@/components/AudioPlayer/AudioNoiseSoundList";
import MenuBar from "@/components/MenuBar/MenuBar";
import SpotifyIframe from "@/components/SpotifyMenu/SpotifyIframe";
import WeatherTracking from "@/components/WeatherTracking/WeatherTracking";
import {DndContext} from "@dnd-kit/core";
import {useState} from "react";
import useBreakpoint from "@/hooks/useBreakpoint";


function App() {
    const animation = useSelector((state: RootState) => state.scene.animation);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDropped, setIsDropped] = useState<boolean>(false);
    const {isDesktop} = useBreakpoint();

    const getCssVariable = (name: string): string => {
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: getCssVariable('--primary-color'),
            },
        },
        components: {
            MuiSlider: {
                styleOverrides: {
                    root: {
                        height: 8,
                    }
                }
            }
        }
    });

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
            left: position.x,
            top: position.y,
        }}>
            <WeatherTracking/>
        </div>
    );

    return (
        <ThemeProvider theme={theme}>
            <AudioPlayer/>
            <AudioNoiseSoundList/>
            {isDesktop && <Loading></Loading>}

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
        </ThemeProvider>
    );
}

export default App

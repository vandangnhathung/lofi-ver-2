import HomePage from "./pages/HomePage";
import React from "react";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PixelLoading from "@/components/Loading/PixelLoading";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import ControlBarMenu from "@/components/ControlBar/ControlBarMenu/ControlBarMenu";
import {createTheme, ThemeProvider} from "@mui/material";


function App() {
    const animation = useSelector((state: RootState) => state.scene.animation);

    // Function to get CSS variable
    const getCssVariable = (name: string): string => {
        console.log(getComputedStyle(document.documentElement));
        return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: getCssVariable('--primary-color'),
            }
        },
        components: {
            // Override Slider styles
            MuiSlider: {
                styleOverrides: {
                    root: {
                        height: 8,
                    }
                }
            }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <AudioPlayer/>
            {/*<Loading></Loading>*/}

            <div className="relative overflow-hidden">
                <PixelLoading duration={0.0000001} status={animation}/>
                <HomePage/>
                <ControlBarMenu/>
            </div>
            {/*<UserComponent></UserComponent>*/}
        </ThemeProvider>
    )
}

export default App

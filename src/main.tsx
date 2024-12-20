import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import './styles/variables.scss';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "@/redux/store";
import {createTheme, ThemeProvider} from "@mui/material";
// import {store} from "@/redux (REMOVE)/store";

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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>

        </BrowserRouter>
    </Provider>
)

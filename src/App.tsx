import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Route, Routes} from "react-router-dom";
import Auth from "@/pages/Auth/Auth";
import HomePageWrapper from "@/pages/HomePage/HomePageWrapper";
import { PopupManager } from "@/components/PopupManager/PopupManager";
import PerformanceMonitor from "@/components/PerformanceMonitor/PerformanceMonitor";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePageWrapper/>}/>
                <Route path="/lofi-ver-2" element={<HomePageWrapper/>}/>

                {/* Authentication */}
                <Route path="/sign-in" element={<Auth/>}/>
                <Route path="/sign-up" element={<Auth/>}/>
                <Route path="/lofi-ver-2/sign-in" element={<Auth/>}/>
                <Route path="/lofi-ver-2/sign-up" element={<Auth/>}/>
            </Routes>
            <PopupManager />
            <PerformanceMonitor />
        </>
    );
}

export default App

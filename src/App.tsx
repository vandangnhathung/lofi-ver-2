import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Route, Routes} from "react-router-dom";
import Auth from "@/pages/Auth/Auth";
import HomePageWrapper from "@/pages/HomePage/HomePageWrapper";


function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePageWrapper/>}/>

            {/* Authentication */}
            <Route path="/sign-in" element={<Auth/>}/>
            <Route path="/sign-up" element={<Auth/>}/>
        </Routes>
    );
}

export default App

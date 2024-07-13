import HomePage from "./pages/HomePage";
import Loading from "./components/loading/Loading";
import {useEffect, useState} from "react";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, [])

    return (
        <>
            {isLoading && (<Loading></Loading>)}

            <div className="relative">
                <HomePage></HomePage>
            </div>
        </>
    )
}

export default App

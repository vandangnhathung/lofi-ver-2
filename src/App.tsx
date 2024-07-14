import HomePage from "./pages/HomePage";
import Loading from "./components/loading/Loading";
import {useEffect, useState} from "react";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    }, [])

    return (
        <>
            {/*{isLoading && (<Loading></Loading>)}*/}
            <Loading></Loading>
            <div className="relative bg-red-500">
                <HomePage></HomePage>
            </div>
        </>
    )
}

export default App

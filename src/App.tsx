import HomePage from "./pages/HomePage";
import Loading from "./components/Loading/Loading";

function App() {

    return (
        <>
            <Loading></Loading>
            <div className="relative bg-red-500">
                <HomePage></HomePage>
            </div>
        </>
    )
}

export default App

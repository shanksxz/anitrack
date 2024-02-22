import Login from "./pages/Login";
import { useStore } from "./app/store";
import Home from "./pages/Home";

function App() {
    const { accessToken } = useStore();

    return <div>{!accessToken ? <Login /> : <Home />}</div>;
}

export default App;

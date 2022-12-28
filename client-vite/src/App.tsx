import {useContext} from "react";
import {AppContext} from "./context";
import ProtRoutes from "./prot-routes/ProtRoutes";
import NonProtRoutes from "./non-prot-routes/NonProtRoutes";

const App = () => {
    const {state} = useContext(AppContext)

return (
    <div className="App">
        {state.USER_LOGGED ? (
            <div id="a"></div>) : (<div id="b"></div>)}
    </div>
)}

export default App

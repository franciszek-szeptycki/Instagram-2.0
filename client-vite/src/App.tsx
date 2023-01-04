import {useContext, useEffect} from "react";
import {AppContext} from "./context";
import ProtRoutes from "./prot-routes/ProtRoutes";
import StartRoutes from "./start-routes/StartRoutes";
import {isTokenValid} from "./features/token";

const App = () => {

    const {state, dispatch} = useContext(AppContext)

    useEffect(() => {
        isTokenValid(dispatch)
    }, [])

return (
    <div className="App">
        {state.USER_LOGGED ? (
            <ProtRoutes/>) : <StartRoutes/>}
    </div>
)}

export default App

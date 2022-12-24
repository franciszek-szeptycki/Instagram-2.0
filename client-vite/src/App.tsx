import {useContext} from "react";
import {AppContext} from "./context";

const App = () => {

    const {state, dispatch} = useContext(AppContext)

return (
    <div className="App">
        <button onClick={() => dispatch({type: "SET_IS_USER_LOGGED", item: !state.USER_LOGGED})}>klikajta</button>
        {state.USER_LOGGED ? "tak" : "nie"}

    </div>
)}

export default App

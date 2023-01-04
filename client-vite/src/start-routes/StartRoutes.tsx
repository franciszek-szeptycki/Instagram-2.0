import Login from "./Login";
import Register from "./Register";
import {Routes, Route} from "react-router-dom";

export default () => {

    return (
        <div data-testid="start-routes">
            <Routes>
                <Route path="*" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </div>
    )
}
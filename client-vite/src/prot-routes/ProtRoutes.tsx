import Home from "./Home";
import './ProtRoutes.sass'
import Nav from "../components/Nav";
import {Route, Routes} from "react-router-dom";
import User from "./User";

export default () => {

    return (
        <div data-testid="prot-routes" className="prot-routes">
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/user/*" element={<User/>} />
            </Routes>
        </div>
    )
}
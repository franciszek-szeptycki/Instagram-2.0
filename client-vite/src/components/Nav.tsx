import './Nav.sass'
import {NavLink} from "react-router-dom";
import {Create, EyeFull, HeartFull, House, User} from "../assets/icons";
import {getUserInfo} from "../features/userInfo";

export default () => {


    return (
        <nav className="nav" >
            <ul className="nav-ul" >
                <li className="nav-ul__li" ><NavLink to="/"><House/></NavLink></li>
                <li className="nav-ul__li" ><NavLink to="/favourites"><HeartFull/></NavLink></li>
                <li className="nav-ul__li" ><NavLink to="/following"><EyeFull/></NavLink></li>
                <li className="nav-ul__li" ><NavLink to="/"><Create/></NavLink></li>
                <li className="nav-ul__li" ><NavLink to={`/user/${getUserInfo().id}`}><User/></NavLink></li>
            </ul>
        </nav>
    )
}
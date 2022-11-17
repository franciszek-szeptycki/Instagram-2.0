import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    CREATE_POST_OFF_FUNCTION,
    CREATE_POST_ON_FUNCTION,
} from "../redux/actions/createPostPanel";
import "./Nav.sass";
import allReducers from "../redux/reducers/index";

type RootState = ReturnType<typeof allReducers>;
const Nav = () => {
    const dispatch = useDispatch();
    const isPanelCreated = useSelector<RootState>(
        (state) => state.createPostPanel
    );

    const handleSwitchONCreatePost = () => {
        return dispatch(CREATE_POST_ON_FUNCTION());
    };

    const handleSwitchOffCreatePost = () => {
        return dispatch(CREATE_POST_OFF_FUNCTION());
    }

    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav__ul">
                    <li className="nav__li">
                        <NavLink
                            className="nav__li-content"
                            to="/"
                            onClick={handleSwitchOffCreatePost}
                        >
                            <i className="fa-solid fa-house"></i>
                        </NavLink>
                    </li>
                    <li className="nav__li">
                        <NavLink
                            className="nav__li-content"
                            to="/following"
                            onClick={handleSwitchOffCreatePost}
                        >
                            <i className="fa-solid fa-eye"></i>
                        </NavLink>
                    </li>
                    <li className="nav__li">
                        <NavLink
                            className="nav__li-content"
                            to="/favourites"
                            onClick={handleSwitchOffCreatePost}
                        >
                            <i className="fa-solid fa-heart"></i>
                        </NavLink>
                    </li>
                    <li className="nav__li">
                        <button
                            className="nav__li-content"
                            onClick={handleSwitchONCreatePost}
                        >
                            <i className="fa-solid fa-square-plus"></i>
                        </button>
                    </li>
                    <li className="nav__li">
                        <NavLink
                            className="nav__li-content"
                            to="/profile"
                            onClick={handleSwitchOffCreatePost}
                        >
                            <i className="fa-solid fa-user"></i>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Nav;

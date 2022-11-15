import * as React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { CREATE_POST_ON, CREATE_POST_ON_FUNCTION } from "../redux/actions/createPostPanel";
import "./Nav.sass"

const Nav = () => {

	const dispatch = useDispatch();

	const handleCreatePost = (e) => {
		e.preventDefault()
		dispatch(CREATE_POST_ON_FUNCTION())
	}

    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav__ul">
                    <li className="nav__li">
                        <NavLink className="nav__li-content" to="/"><i className="fa-solid fa-house"></i></NavLink>
                    </li>
                    <li className="nav__li">
                        <NavLink className="nav__li-content" to="/following"><i className="fa-solid fa-eye"></i></NavLink>
                    </li>
                    <li className="nav__li">
                        <NavLink className="nav__li-content" to="/favourites"><i className="fa-solid fa-heart" ></i></NavLink>
                    </li>
                    <li className="nav__li">
                        <button className="nav__li-content" onClick={(e) => handleCreatePost(e)}>
                            <i className="fa-solid fa-square-plus"></i>
                        </button>
                    </li>
                    <li className="nav__li">
                        <NavLink className="nav__li-content" to="/profile"><i className="fa-solid fa-user"></i></NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Nav;

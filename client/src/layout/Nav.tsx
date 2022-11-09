import * as React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { ADD_POST_ON, ADD_POST_ON_FUNCTION } from "../redux/actions/addPostPanel";

const Nav = () => {

	const dispatch = useDispatch();

	const handleAddPost = (e) => {
		e.preventDefault()
		dispatch(ADD_POST_ON_FUNCTION())
	}

    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav__ul">
                    <li className="nav__li">
                        <NavLink to="*">strona główna</NavLink>
                    </li>
                    <li className="nav__li">
                        <NavLink to="/following">obserwowani</NavLink>
                    </li>
                    <li className="nav__li">
                        <NavLink to="/favourites">ulubione</NavLink>
                    </li>
                    <li className="nav__li">
                        <button onClick={(e) => handleAddPost(e)}>
                            dodaj post
                        </button>
                    </li>
                    <li className="nav__li">
                        <NavLink to="/profile">profil</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Nav;

import * as React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { CREATE_POST_ON, CREATE_POST_ON_FUNCTION } from "../redux/actions/createPostPanel";

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
                        <NavLink to="*">strona główna</NavLink>
                    </li>
                    <li className="nav__li">
                        <NavLink to="/following">obserwowani</NavLink>
                    </li>
                    <li className="nav__li">
                        <NavLink to="/favourites">ulubione</NavLink>
                    </li>
                    <li className="nav__li">
                        <button onClick={(e) => handleCreatePost(e)}>
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

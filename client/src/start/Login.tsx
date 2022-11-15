import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./start.sass";
import { LOG_IN_FUNCTION } from '../redux/actions/isLogged'
import reqServer, { reqType } from "../utils/reqServer";
import getToken from "../utils/getToken";

interface loginDataInterface {
    email: string;
    password: string;
}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch()
    
    const handleInput = ({ name, value }): void => {
        switch (name) {
            case "email":
                return setEmail(value);
            case "password":
                return setPassword(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData: loginDataInterface = {
            email,
            password,
        };

        const {status, msg, data}: reqType = await reqServer("POST", loginData, "/auth/log-in", false)
        if (status === 200) {
            dispatch(LOG_IN_FUNCTION())
        }
    };

    return (
        <div className="start-background">
            <div className="login-start start">
                <div className="start-main">
                    <p className="start__title">
                        Welcome back! Please login to your account.
                    </p>
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        {/* email */}
                        <p className="form__label-name">email</p>
                        <label className="form__label">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                className="form__label-input"
                                onChange={(e) => handleInput(e.target)}
                                data-testid="email"
                            />
                        </label>

                        {/* password */}
                        <p className="form__label-name">password</p>
                        <label className="form__label">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form__label-input"
                                onChange={(e) => handleInput(e.target)}
                                data-testid="password"
                            />
                        </label>

                        {/* submit and link */}
                        <div className="start__buttons">
                            <input
                                className="start__button start__button-login"
                                type="submit"
                                value="log in"
                            />
                            <a className="start__button" href="/sign-up">
                                sign up
                            </a>
                        </div>
                    </form>
                </div>
                <div className="start-aside"></div>
            </div>
        </div>
    );
};

export default Login;

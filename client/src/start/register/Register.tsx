import * as React from "react";
import "../start.sass";
import { useState } from "react";
import reqServer, { serverRes } from "../../utils/reqServer";
import {
    verify,
    checkPasswordIllegality,
    checkPasswordAgainIllegality,
    checkUsernameIllegality,
} from "./utils/verification";
import Notification from "../Notification";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    let usernameError: string | boolean | string[] = checkUsernameIllegality(username)
    let passwordError: string | boolean | string[] = checkPasswordIllegality(password)
    let passwordAgainError: string | boolean = checkPasswordAgainIllegality(password, passwordAgain)
    const [emailErrorServer, setEmailErrorServer] = useState("")
    const [usernameErrorServer, setUsernameErrorServer] = useState("")

    const handleInput = ({ name, value }): void => {
        switch (name) {
            case "email":
                setEmail(value);
                break
            case "username":
                setUsername(value);
                break
            case "password":
                setPassword(value);
                break
            case "password again":
                setPasswordAgain(value);
                break
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (verify({ username, password, passwordAgain })) {
            const registerData = {
                email,
                username,
                password,
            };
            const { status, msg }: serverRes = await reqServer(
                "POST",
                registerData,
                "/auth/sign-up",
                true
            );
            console.log(status)
            switch (status) {
                case 201:
                    window.location.href = "/login";
                    break;
                case 400:
                    return setEmailErrorServer(msg);
                case 401:
                    return setUsernameErrorServer(msg);
            }
        }
    };

    return (
        <div className="start-background register-bg">
            <div className="register-start start">
                <div className="start-aside"></div>
                <div className="start-main">
                    <p className="start__title">Welcome to Instagram 2.0</p>
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
                                value={email}
                            />
                            <Notification data={emailErrorServer} />
                        </label>

                        {/* username */}
                        <p className="form__label-name">username</p>
                        <label className="form__label">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="form__label-input"
                                onChange={(e) => handleInput(e.target)}
                                data-testid="username"
                                value={username}
                            />
                            <Notification data={usernameError} />
                            <Notification data={usernameErrorServer} />
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
                                value={password}
                            />
                            <Notification data={passwordError} />
                        </label>

                        {/* password again */}
                        <p className="form__label-name">password again</p>
                        <label className="form__label">
                            <input
                                id="password again"
                                name="password again"
                                type="password"
                                className="form__label-input"
                                onChange={(e) => handleInput(e.target)}
                                data-testid="password again"
                                value={passwordAgain}
                            />
                            <Notification data={passwordAgainError} />
                        </label>

                        {/* submit and link */}
                        <div className="start__buttons">
                            <input
                                className="start__button start__button-register"
                                type="submit"
                                value="sign up"
                                data-testid="submit"
                            />
                            <a className="start__button" href="/">
                                log in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

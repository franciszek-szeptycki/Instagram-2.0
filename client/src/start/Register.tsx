import * as React from "react";
import "./start.sass";
import { useState } from "react";
import ErrorReport from "./ErrorReport";
import { sendRegisterForm } from "./sendRequest";

interface registerDataInterface {
    email: string;
    username: string;
    password: string;
}

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [msg, setMsg] = useState("info");

    const handleInput = ({ name, value }): void => {
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "username":
                setUsername(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "password again":
                setPasswordAgain(value);
                break;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: registerDataInterface = {
            email,
            username,
            password,
        };

        // W E R Y F I K A C J A   D A N Y C H
        // const errors = new ErrorReport(data)
        // switch (errors.noErrors) {
        //     case true:
        //         return sendRegisterForm(data)
        //     case false:
        //         return console.log(errors)

        sendRegisterForm(data);
    };

    return (
        <div className="start-background">
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
                        </label>

                        {/* password */}
                        <p className="form__label-name">password</p>
                        <label className="form__label form__label-wrong">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form__label-input"
                                onChange={(e) => handleInput(e.target)}
                                data-testid="password"
                                value={password}
                            />
                        </label>

                        {/* password again */}
                        <p className="form__label-name">password again</p>
                        <label className="form__label form__label-wrong">
                            <input
                                id="password again"
                                name="password again"
                                type="password"
                                className="form__label-input"
                                onChange={(e) => handleInput(e.target)}
                                data-testid="password again"
                                value={passwordAgain}
                            />
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

import React, { useState } from "react";
import "./Panel.sass";
import { sendLoginForm } from "./sendRequest";

interface loginDataInterface {
    email: string;
    password: string;
}

const labels: string[] = ["email", "password"];

const LoginPanel = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const handleInput = ({ name, value }): void => {
        switch (name) {
            case "email":
                return setEmail(value);
            case "password":
                return setPassword(value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: loginDataInterface = {
            email,
            password,
        };

        sendLoginForm(data);
    };

    return (
        <div className="panel-background">
            <div className="login-panel panel">
                <div className="panel-main">
                    <p className="panel__title">
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
                                type="text"
                                className="form__label-input"
                                onChange={(e) => handleInput(e.target)}
                                data-testid="password"
                            />
                        </label>

                        {/* submit and link */}
                        <div className="panel__buttons">
                            <input
                                className="panel__button panel__button-login"
                                type="submit"
                                value="log in"
                            />
                            <a className="panel__button" href="/sign-up">
                                sign up
                            </a>
                        </div>
                    </form>
                </div>
                <div className="panel-aside"></div>
            </div>
        </div>
    );
};

export default LoginPanel;

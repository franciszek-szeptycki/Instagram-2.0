import React, { useState } from "react";
import Label from "./Label";
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

        sendLoginForm(data)
    }

    return (
        <div className="panel-background">
            <div className="login-panel panel">
                <div className="panel-main">
                    <p className="panel__title">Welcome back! Please login to your account.</p>
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        {labels.map((elem: string, index: number) => (
                            <Label
                                key={index}
                                data={elem}
                                handleInput={handleInput}
                            />
                        ))}
                        <div className="panel__buttons">
                            <input
                                className="panel__button panel__button-login"
                                type="submit"
                                value="log in"
                            />
                            <a className="panel__button" href="/sign-up">sign up</a>
                        </div>
                    </form>
                </div>
                <div className="panel-aside"></div>
            </div>
        </div>
    );
};

export default LoginPanel;

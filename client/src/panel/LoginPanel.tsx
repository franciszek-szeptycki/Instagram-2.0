import axios from "axios";
import React, { useState } from "react";
import Label from "./Label";
import "./Panel.sass";

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

        axios.post("http://localhost:5000/auth/log-in")
    }

    return (
        <div className="panel-background">
            <div className="login-panel panel">
                <div className="panel-main">
                    <p className="panel__title">Welcome back! Please login to your account.</p>
                    <form className="form" onSubmit={(e) => handleSubmit(e)}>
                        {labels.map((item: string, index: number) => (
                            <Label
                                key={index}
                                data={item}
                                handleInput={handleInput}
                            />
                        ))}
                        <label className="form__label">
                            <input
                                className="form__label-submit"
                                type="submit"
                                value="log in"
                            />
                        </label>
                    </form>
                </div>
                <div className="panel-aside"></div>
            </div>
        </div>
    );
};

export default LoginPanel;

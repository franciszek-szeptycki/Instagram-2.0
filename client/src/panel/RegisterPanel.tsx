import * as React from "react";
import { useState } from "react";
import dataCorrectStatus from "./dataCorrectStatus";
import Label from "./Label";
import axios from "axios";

import "./Panel.sass";

interface registerDataInterface {
    email: string;
    username: string;
    password: string;
}

const labels: string[] = ["email", "username", "password", "password again"];

const RegisterPanel = () => {
    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordAgain, setPasswordAgain] = useState<string>();

    const handleInput = ({ name, value }): void => {
        switch (name) {
            case "email":
                return setEmail(value);
            case "username":
                return setUsername(value);
            case "password":
                return setPassword(value);
            case "password again":
                return setPasswordAgain(value);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data: registerDataInterface = {
            email,
            username,
            password,
        };

        dataCorrectStatus(data, passwordAgain);

        axios.post('http://localhost:5000/auth/sign-up', {
            data
        }).then(res => console.log(res))
    };

    return (
        <div className="panel-background">
            <div className="register-panel panel">
                <div className="panel-aside"></div>
                <div className="panel-main">
                    <p className="panel__title">Welcome to Instagram 2.0</p>
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
                                value="sign up"
                            />
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPanel;

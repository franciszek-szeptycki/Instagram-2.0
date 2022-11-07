import * as React from "react";
import { useState } from "react";
import ErrorReport from "./ErrorReport";
import Label from "./Label";
import "./Panel.sass";
import { sendRegisterForm } from "./sendRequest";

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

        // W E R Y F I K A C J A   D A N Y C H
        // const errors = new ErrorReport(data)
        // switch (errors.noErrors) {
        //     case true:
        //         return sendRegisterForm(data)
        //     case false:
        //         return console.log(errors)

        sendRegisterForm(data)
        }

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
                        <div className="panel__buttons">
                            <input
                                className="panel__button-one"
                                type="submit"
                                value="sign up"
                                data-testid="submit"
                            />
                            <a className="panel__button-two" href="/">log in</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPanel;

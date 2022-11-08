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
        <div className="panel-background">
            <div className="register-panel panel">
                <div className="panel-aside"></div>
                <div className="panel-main">
                    <p className="panel__title">Welcome to Instagram 2.0</p>
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
                                className="panel__button panel__button-register"
                                type="submit"
                                value="sign up"
                                data-testid="submit"
                            />
                            <a className="panel__button" href="/">
                                log in
                            </a>
                        </div>
                    </form>
                    <div className="panel__alert">
                        <p className="panel__alert-msg">
                            {password === passwordAgain
                                ? msg
                                : "this username is to long to be the main captain of my ship"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPanel;

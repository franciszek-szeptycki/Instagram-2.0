import * as React from "react";
import Label from "./Label";

const labels: string[] = ["email", "username"];

const LoginPanel = () => {

    return (
        <div className="login-background">
            <div className="login panel">
                <p className="panel__title">Title</p>
                <form className="form panel__form">
                    {labels.map((item: string, index: number) => (
                        <Label key={index} data={item} />
                    ))}
                </form>
            </div>
        </div>
    );
};

export default LoginPanel;

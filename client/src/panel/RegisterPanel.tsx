import * as React from "react";
import Label from "./Label";

const labels: string[] = ["email", "username", "password", "password"];

const RegisterPanel = () => {

    return (
        <div className="register-background">
            <div className="register panel">
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

export default RegisterPanel;

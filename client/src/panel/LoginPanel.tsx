import React, {useState} from "react";
import dataCorrectStatus from "./dataCorrectStatus";
import Label from "./Label";

interface loginDataInterface {
	email: string,
	password: string,
}

const labels: string[] = ["email", "username"];

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

        const preparedData: loginDataInterface = {
			email,
			password,
		};
		
		dataCorrectStatus(preparedData)

        console.log(preparedData);
    };

    return (
        <div className="login-background">
            <div className="login panel">
                <p className="panel__title">Title</p>
                <form
                    className="form panel__form"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    {labels.map((item: string, index: number) => (
                        <Label
                            key={index}
                            data={item}
                            handleInput={handleInput}
                        />
                    ))}
                    <label className="form__label">
                        <input className="form__label-submit" type="submit" />
                    </label>
                </form>
            </div>
        </div>
    );

};

export default LoginPanel;

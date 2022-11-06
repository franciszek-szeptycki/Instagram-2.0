import * as React from "react";

const Label = ({ data, handleInput }) => (
    <label className="form__label">
        <p className="form__label-name">{data}</p>
        <input
            id={data}
            name={data}
            type={data.includes("password") ? "password" : "text"}
            className="form__label-input"
            onChange={(e) => handleInput(e.target)}
        />
    </label>
);

export default Label;

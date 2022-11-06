import * as React from "react";

const Label = ({ data }) => (
    <label className="form__label">
        <p className="form__label-name">{data}</p>
		<input name={data} type={data} className="form__label-input" />
    </label>
);

export default Label;
import { render, screen, fireEvent } from "@testing-library/react";
// import { logRoles } from "@testing-library/dom";
import RegisterPanel from "./RegisterPanel";

describe("is register form protected", () => {
    const utils = render(<RegisterPanel />);

    const setup = (name) => {
        const input = utils.getByTestId(name);
        return {
            input,
            ...utils,
        };
    };

    const submit = () => {
        const submitBtn = screen.getByTestId("submit");
        return submitBtn;
    };
    it("", () => {});
});

describe("register")

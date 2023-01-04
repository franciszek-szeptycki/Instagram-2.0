import {expect, test} from "vitest";
import {render} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import StartRoutes from "../../StartRoutes";

const init = (path: string, id: string) => {
    const {queryByTestId} = render(<MemoryRouter initialEntries={[path]}>
        <StartRoutes/>
    </MemoryRouter>)
    return queryByTestId(id)
}

test("/login", () => {
    const result = init('/', 'login')
    expect(result).toBeTruthy()
})

test("/register", () => {
    const result = init('/register', 'register')
    expect(result).toBeTruthy()
})

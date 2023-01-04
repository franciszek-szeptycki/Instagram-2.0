import { expect, test} from "vitest";
import Login from "../../Login";
import {render, fireEvent, waitFor, screen, queryByText, getByText, getByRole} from '@testing-library/react';

test("Login renders email and password textbox", () => {
    render(<Login/>)
    const textbox = screen.getAllByRole("textbox")
    expect(textbox.length).toEqual(2)
})

// describe("Login server behaviours", () => {
    // test("status 200 => USER_LOGGED true", async () => {
    //     const mock = new AxiosMockAdapter(axios);
    //     const mockResponse = { data: {}, msg: "Email is required" };
    //     mock.onPost('/auth/log-in').reply(200, mockResponse);
    //
    //     const {getByText} = render(<Root initialState={{USER_LOGGED: false}} ><Login/></Root>)
    //
    //     const submitBtn = getByText("LOG IN")
    //     fireEvent.submit(submitBtn)
    //
    //     await waitFor(() => getByText('Email is required'))
    //
    //     expect(getByText('Email is required')).toBeTruthy()
    //
    // })
// })
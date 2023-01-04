import check from "../checkUserData";
import {describe, expect, it} from "vitest";


// perfect data
const e = "example@gmail.com"
const u = "abcdef"
const p = "!@12QWqw"

it("perfect", () => {
    expect(check(e, u, p, p)).toBeTruthy()
})

describe("email", () => {
    it("is empty", () => {
        expect(check("", u, p, p)).toBeFalsy()
    })
})

describe("username", () => {
    const username = (arg: string) => expect(check(e, arg, p, p)).toBeFalsy()
    it("min. lenght", () => username(""))
    it("doesn't contain illegal characters", () => username("神風神風神"))
    it("max. length", () => username("1234567890abcdef"))
})

describe("password", () => {
    const password = (arg: string) => expect(check(e, u, arg, arg))
    it("the right lenght", () => password("!1Qq"))
    it("has a lowercase", () => password("!!!111QQQ"))
    it("has a uppercase", () => password("!!!111qqq"))
    it("has a special character", () => password("111QQQqqq"))
    it("has a number", () => password("!!!QQQqqq"))

    it("the same passwords", () => expect(check(e, u, "!@12QWqw", "wqWQ21@!")).toBeFalsy())
})
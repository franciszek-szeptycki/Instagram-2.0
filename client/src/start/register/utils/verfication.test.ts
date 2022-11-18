import {
    verify,
    checkUsernameIllegality,
    checkPasswordIllegality,
    checkPasswordAgainIllegality,
} from "./verification";

// ALL FIELDS
describe("password and username verification", () => {
    it("all empty", () => {
        const raport = verify({
            username: "",
            password: "",
            passwordAgain: "",
        });
        expect(raport).toBeFalsy();
    });

    it("all correct", () => {
        const raport = verify({
            username: "Adam-Malysz",
            password: "!@12QWqw",
            passwordAgain: "!@12QWqw",
        });
        expect(raport).toBeTruthy();
    });
});

// // USERNAME

describe("username verification", () => {
    it("username illegal chars", () => {
        const raport = checkUsernameIllegality("Adam-Małysz");
        expect(raport).toEqual(["ł"]);
    });

    it("username empty", () => {
        const raport = checkUsernameIllegality("");
        expect(raport).toEqual("username is too short (min. 5)");
    });

    it("username 4 chars", () => {
        const raport = checkUsernameIllegality("Adam");
        expect(raport).toEqual("username is too short (min. 5)");
    });

    it("username correct", () => {
        const raport = checkUsernameIllegality("Adam_-");
        expect(raport).toBeFalsy()
    });
});

// PASSWORD

describe("password verification", () => {
    it("password empty", () => {
        const raport = checkPasswordIllegality("");
        expect(raport).toEqual("password is too short (min. 8)");
    });

    it("password without numbers", () => {
        const raport = checkPasswordIllegality("AAAAbbbb");
        expect(raport).toEqual("password must contain numbers");
    });

    it("password without lowercase letters", () => {
        const raport = checkPasswordIllegality("AAAA1111");
        expect(raport).toEqual(
            "password must contain lowercase letters"
        );
    });

    it("password without capitale letters", () => {
        const raport = checkPasswordIllegality("aaaa1111");
        expect(raport).toEqual(
            "password must contain capital letters"
        );
    });

    it("password correct", () => {
        const raport = checkPasswordIllegality("!@12QWqw");
        expect(raport).toBeFalsy();
    })
});

// PASSWORD AGAIN
describe("password again verification", () => {
    it("passwords are same", () => {
        const raport = checkPasswordAgainIllegality("!@12QWqw", "!@12QWqw");
        expect(raport).toBeFalsy()        
    });

    it("the passwords are not the same", () => {
        const raport = checkPasswordAgainIllegality("!@12QWqw", "!@12QWqw");
        expect(raport).toBeFalsy()
    });
});

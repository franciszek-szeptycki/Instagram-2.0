import Verification from "./verification";


// BOTH

describe("password and username verification", () => {
	it("all empty", () => {
		const raport = new Verification("", "");
		expect(raport.isCorrect).toBeFalsy();
	});

    it("all correct", () => {
        const raport = new Verification("Adam Malysz", "!@12QWqw");
        expect(raport.isCorrect).toBeTruthy();
    });
});


// USERNAME

describe("username verification", () => {
    it("username illegal chars", () => {
        const raport = new Verification("Adam-Małysz", "!@12QWqw");
        expect(raport.usernameError).toEqual(["-", "ł"]);
        expect(raport.isCorrect).toBeFalsy();
    });

    it("username empty", () => {
        const raport = new Verification("", "!@12QWqw");
        expect(raport.usernameError).toEqual("username is too short (min. 5)");
        expect(raport.isCorrect).toBeFalsy();
    });
});


// PASSWORD

describe("password verification", () => {
    it("password empty", () => {
        const raport = new Verification("Adam Malysz", "");
        expect(raport.passwordError).toEqual("password is too short (min. 8)");
        expect(raport.isCorrect).toBeFalsy();
    });

    it("password without numbers", () => {
        const raport = new Verification("Adam Malysz", "AAAAbbbb");
        expect(raport.passwordError).toEqual("password must contain numbers");
        expect(raport.isCorrect).toBeFalsy();
    });

    it("password without lowercase letters", () => {
        const raport = new Verification("Adam Malysz", "AAAA1111");
        expect(raport.passwordError).toEqual(
            "password must contain lowercase letters"
        );
        expect(raport.isCorrect).toBeFalsy();
    });

    it("password without capitale letters", () => {
        const raport = new Verification("Adam Malysz", "aaaa1111");
        expect(raport.passwordError).toEqual(
            "password must contain capital letters"
        );
        expect(raport.isCorrect).toBeFalsy();
    });
});

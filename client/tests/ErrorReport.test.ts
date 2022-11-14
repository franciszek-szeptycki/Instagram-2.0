import ErrorReport from "../src/start/utils/ErrorReport";

describe("is register form protected", () => {
    it("username empty fields", () => {
        const report = new ErrorReport({
            username: "",
			password: "!@12qwQW"
		});
		expect(report.usernameError).toBe("this username is too short (min. 5)")
	});

	it("username illegal characters", () => {
		const report = new ErrorReport({
            username: "abcdefg%",
			password: "!@12QWqw"
		});
		expect(report.usernameError).toBe("this username contains an illegal character: %")
	})
	
	it("password empty fields", () => {
        const report = new ErrorReport({
            username: "robert_kubica",
			password: ""
		});
		expect(report.passwordError).toBe("the password is too short (min. 8)")
    });
});

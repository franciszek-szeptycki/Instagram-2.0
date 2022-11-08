const legalCharacters = `qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHG
    FDSAZXCVBNM._1234567890`.split("");

interface formData {
    password: string;
    username: string;
}

class ErrorReport {
    usernameError: string | boolean;
    passwordError: string | boolean;
    noErrors: boolean;

    constructor(data: formData) {
        this.usernameError = this.checkUsername(data.username);
        this.passwordError = this.checkPassword(data.password);
        this.noErrors = this.getErrorRaport();
    }

    private checkUsername(username: string) {
        if (username.length < 4) return "this username is too short (min. 5)";

        let illegalChar: string;
        const test = username.split("").filter((item) => {
            legalCharacters.map((char) => {
                if (item === char) return item;
            });
            illegalChar = item;
        });

        if (test.length !== username.length)
            return `this username contains an illegal character: ${illegalChar}`;

        return false;
    }

    private checkPassword(password: string) {
        if (password.length < 8) return "the password is too short (min. 8)";

        return false;
    }

    private getErrorRaport() {
        const errors = this.usernameError || this.passwordError;
        switch (errors) {
            case false:
                return true;
            default:
                return false;
        }
    }
}

export default ErrorReport;

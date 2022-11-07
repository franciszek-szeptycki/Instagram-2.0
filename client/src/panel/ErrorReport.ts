interface formData {
    email: string;
    password: string;
    username?: string;
}

class ErrorReport {
    private emailError: string | boolean;
	private usernameError: string | boolean;
    private passwordError: string | boolean;
    public noErrors: boolean;

    constructor(data: formData) {
        this.emailError = this.checkEmail(data.email);
        this.usernameError = this.checkUsername(data.username);
        this.passwordError = this.checkPassword(data.password);
        this.noErrors = this.getErrorRaport();
    }

    private checkEmail(email: unknown) {
        return false;
    }

    private checkUsername(username: unknown) {
        if (username === undefined) return false;
    }

    private checkPassword(password: unknown) {
        return false;
    }

    private getErrorRaport() {
		const errors = this.emailError || this.usernameError || this.passwordError
		switch (errors) {
			case false:
				return true
			default:
				return false
		}
    }
}

export default ErrorReport
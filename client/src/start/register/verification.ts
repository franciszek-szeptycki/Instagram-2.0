class Verification {
    private username: string;
    private password: string;

    public usernameError: string | string[] | false;
    public passwordError: string | false;
    public isCorrect: boolean = false;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
        this.verify();
    }

    private verify() {
        this.usernameError = this.verifyUsername();
		this.passwordError = this.verifyPassword();
		

        if (!this.usernameError && !this.passwordError) {
            this.isCorrect = true;
        }
    }

    // USERNAME
    private verifyUsername() {
        if (this.username.length < 5) return "username is too short (min. 5)";

        const illegal = this.checkUsernameCharacters(this.username);
        if (illegal.length !== 0) return illegal;

        return false;
    }

    private checkUsernameCharacters(text: string): string[] {
        const illegalChars = text
            .split("")
            .filter((item) => !/^[A-Za-z0-1\s]*$/.test(item));
        return illegalChars;
    }

    // PASSWORD
    private verifyPassword() {
		if (this.password.length < 8) return "password is too short (min. 8)";
		
		const illegal = this.checkPasswordCharacters(this.password);
		if (illegal) return illegal

		return false

	}
	
	private checkPasswordCharacters(text: string): string | false {
		if (text === text.toLowerCase()) return "password must contain capital letters"
		if (text === text.toUpperCase()) return "password must contain lowercase letters"
		if (!text.replace(/([^0-1]+)/gi, '')) return "password must contain numbers"
		return false
	}
}

export default Verification;

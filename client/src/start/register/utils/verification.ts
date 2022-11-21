// USERNAME
export const checkUsernameIllegality = (username): string | string[] | boolean => {
    if (username.length < 5) return "username is too short (min. 5)";

    const illegal = checkUsernameCharacters(username);
    if (illegal.length !== 0) return illegal;

    return false;
};

function checkUsernameCharacters(text: string): string[] {
    const illegalChars = text
        .split("")
        .filter((item) => !/^[A-Za-z0-1_/-]*$/.test(item));
    return illegalChars;
}

// PASSWORD
export const checkPasswordIllegality = (password: string): string | boolean => {
    // if (password.length < 8) return "password is too short (min. 8)";
    //
    // const illegal = checkPasswordCharacters(password);
    // if (illegal) return illegal;

    return false;
};

function checkPasswordCharacters(text: string): string | boolean {
    // if (text === text.toLowerCase())
    //     return "password must contain capital letters";
    // if (text === text.toUpperCase())
    //     return "password must contain lowercase letters";
    // if (!text.replace(/([^0-1]+)/gi, ""))
    //     return "password must contain numbers";
    return false;
}

// PASSWORD AGAIN
export const checkPasswordAgainIllegality = (
    password: string,
    passwordAgain: string
) => (password !== passwordAgain ? "the password are not the same" : false);

// BOTH
export const verify = ({ username, password, passwordAgain }): boolean => {
    const usernameError = checkUsernameIllegality(username);
    const passwordError = checkPasswordIllegality(password);
    const passwordAgainError = checkPasswordAgainIllegality(
        password,
        passwordAgain
    );

    if (!usernameError && !passwordError && !passwordAgainError) return true;
    else return false;
};

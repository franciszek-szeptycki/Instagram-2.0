// USERNAME
export const verifyUsername = (username) => {
    if (username.length < 5) return "username is too short (min. 5)";

    const illegal = checkUsernameCharacters(username);
    if (illegal.length !== 0) return illegal;

    return false;
}

function checkUsernameCharacters (text: string): string[] {
    const illegalChars = text
        .split("")
        .filter((item) => !/^[A-Za-z0-1\s]*$/.test(item));
    return illegalChars;
}


// PASSWORD
export const verifyPassword = (password: string): string | string[] | boolean => {
    if (password.length < 8) return "password is too short (min. 8)";
    
    const illegal = checkPasswordCharacters(password);
    if (illegal) return illegal

    return false
}
	
function checkPasswordCharacters(text: string): string | false {
    if (text === text.toLowerCase()) return "password must contain capital letters"
    if (text === text.toUpperCase()) return "password must contain lowercase letters"
    if (!text.replace(/([^0-1]+)/gi, '')) return "password must contain numbers"
    return false
}


// PASSWORD AGAIN
export const verifyPasswordAgain = (password: string, passwordAgain: string) => password !== passwordAgain

// BOTH
export const verify = ({password, username}) => {
    const usernameError = verifyUsername(password);
    const passwordError = verifyPassword(username);

    if (!usernameError && !passwordError) return true
    else return false
}
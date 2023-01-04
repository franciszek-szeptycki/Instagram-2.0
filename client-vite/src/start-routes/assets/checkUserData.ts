// @ts-ignore
import {NotificationManager} from'react-notifications'
export default (email: string, usrn: string, pwd: string, pwd2: string ): boolean => {

    let areValid: boolean = true
    const setError = (info: string): void => {
        areValid = false
        NotificationManager.error(info, "", 5000)
    }

    // CHECK EMAIL
    if(!email) setError("Email is required")

    // CHECK USERNAME
    if(usrn.length < 5) setError("Username must be at least 5 characters long")
    else if(!/^[a-zA-Z0-9]*$/.test(usrn)) setError("Username can contain only latin letters and numbers")
    else if(usrn.length > 15) setError("Username must be no longer than 15 characters")

    // CHECK PASSWORD
    if(pwd.length < 8) setError("Password must be at least 8 characters long")
    else if (!/[a-z]/.test(pwd)) setError("Password must contain at least one lowercase letter");
    else if (!/[A-Z]/.test(pwd)) setError("Password must contain at least one uppercase letter");
    else if (!/[0-9]/.test(pwd)) setError("Password must contain at least one number");
    else if (!/[!@#\$%\^&\*]/.test(pwd)) setError("Password must contain at least one special character");

    // SECOND PASSWORD
    if(pwd !== pwd2) setError("The given passwords do not match")

    return areValid
}

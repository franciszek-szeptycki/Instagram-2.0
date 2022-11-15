import { useState } from "react";
import jwt_decode from "jwt-decode";

interface token {
	name: string;
	exp: number;
}

const getToken = (): string | null => {
	try {
        const userToken: string = localStorage.getItem("access_token");
        const decodedToken = jwt_decode<token>(userToken)
        console.log(decodedToken.exp)
        if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            return
        } else {
            return userToken
        }
    } catch {
        return ""
    }
}


// function useToken() {
//     const [token, setToken] = useState(getToken());

//     function saveToken(userToken) {
//         localStorage.setItem("token", userToken);
//         setToken(userToken);
//     }

//     function removeToken() {
//         localStorage.removeItem("token");
//         setToken("");
//     }

//     return {
//         setToken: saveToken,
//         token,
//         removeToken,
//     };
// }

export default getToken;

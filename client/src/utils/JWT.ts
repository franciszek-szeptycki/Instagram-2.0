// import { useState } from "react";

interface tokenStatusInterface {
    isTokenThere: boolean;
    token?: string;
}

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const getToken = (): tokenStatusInterface => {
    const userToken = localStorage.getItem("token");

    if (!userToken) {
        removeToken();
        return {
            isTokenThere: false,
        };
    }

	// FEATURE TO ADD - add if-gate with isTokenExpired
    return {
        isTokenThere: true,
        token: userToken,
    };
};

// const useToken = () => {
//     const [token, setToken] = useState(getToken());

//     function getToken() {
// 		// const userToken = localStorage.getItem("token") || null;
// 		const userToken = localStorage.getItem("token");
// 		console.log(userToken)
//         if (
//             !userToken ||
//             userToken === "undefined" ||
//             userToken === "null" ||
//             userToken === "false"
//         ) {
//             return false;
//         } else if (jwt_decode(userToken).exp * 1000 < Date.now()) {
//             localStorage.removeItem("token");
//             return false;
//         }
//         return userToken && userToken;
//     }

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
// };

// export default useToken;

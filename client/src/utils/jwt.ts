import { useState } from "react";
import jwt_decode from "jwt-decode";

export function getToken() {
	const userToken = localStorage.getItem("access_token_cookie");
	if (!userToken) return false;
	else return userToken && userToken;
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

// export default useToken;

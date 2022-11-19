import { useState } from "react";
import jwt_decode from "jwt-decode";

interface token {
	name: string;
    exp: number;
    sub: number
}

const getToken = (): string | null => {
	try {
        const userToken: string = localStorage.getItem("access_token");
        const decodedToken = jwt_decode<token>(userToken)

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

export const getUserId = (): number => {
    const userToken: string = localStorage.getItem("access_token");
    const decodedToken = jwt_decode<token>(userToken)
    return decodedToken.sub
}

export default getToken;

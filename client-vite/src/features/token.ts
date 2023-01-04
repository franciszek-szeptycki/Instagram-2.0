import API from "./API";
import {ActionType} from "../context/reducers";
import jwtDecode from 'jwt-decode'

export const getToken = (): string => {
    const token = localStorage.getItem("access_token")
    if (!token) return ""
    const decodedToken = jwtDecode<any>(token)

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("access_token")
        return ""
    } else return token

}

export const isTokenValid = (dispatch: React.Dispatch<ActionType>) => {
    const token = getToken()

    if (token) {
        API("POST", "/auth/access_token", null, true)
        dispatch({type: "SET_USER_LOGGED", item: true})
    } else {
        dispatch({type: "SET_USER_LOGGED", item: false})
    }
}
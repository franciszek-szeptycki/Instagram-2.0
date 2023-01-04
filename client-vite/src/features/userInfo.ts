import jwtDecode from 'jwt-decode'

export const setUserInfo = (username: string, image: string, accessToken: string): void => {
    localStorage.setItem("id", jwtDecode<any>(accessToken).ID)
    localStorage.setItem("username", username)
    localStorage.setItem("image", image)
}

export const getUserInfo = (): {username: string, image: string, id: string} => {
    const username = localStorage.getItem("username") || ""
    const image = localStorage.getItem("image") || ""
    const id = localStorage.getItem("id") || ""
    return {username, image, id}
}
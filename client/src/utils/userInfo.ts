import { getUserId } from "./getToken";

interface userInfo {
	username: string,
	image: string
	userId: string
}

export const setUserInfo = ({ user_name, image }) => {
    if(user_name) localStorage.setItem("user_info-username", user_name);
	if (image) localStorage.setItem("user_info-image", image);
	localStorage.setItem("user_info-id", getUserId().toString())
};

export const getUserInfo = (): userInfo => {
	const username = localStorage.getItem("user_info-username");
	const image = localStorage.getItem("user_info-image");
	const userId = localStorage.getItem("user_info-id");
	return { username, image, userId}
}

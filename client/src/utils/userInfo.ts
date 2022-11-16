interface userInfo {
	username: string,
	image: string
}

export const setUserInfo = ({ user_name, image }) => {
    localStorage.setItem("user_info-username", user_name);
    localStorage.setItem("user_info-image", image);
};

export const getUserInfo = (): userInfo => {
	const username = localStorage.getItem("user_info-username");
	const image = localStorage.getItem("user_info-image");
	return { username, image}
}

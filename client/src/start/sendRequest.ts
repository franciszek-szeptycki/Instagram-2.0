import { LOG_IN_FUNCTION } from '../redux/actions/isLogged'

export const sendRegisterForm = (data: object) => {
    fetch("/auth/sign-up", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("ok:", data);
        })
        .catch((error) => {
            console.error("not ok:", error);
        });
};

export const sendLoginForm = (data: object, dispatch) => {

    fetch("/auth/log-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if (res.status === 200) return res.json();
            else return null
        })
        .then((data) => {
            localStorage.setItem("jwt", data.access_token);
            dispatch(LOG_IN_FUNCTION())

        })
        .catch((error) => {
            console.error("not ok:", error);
        });
};

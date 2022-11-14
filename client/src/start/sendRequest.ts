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
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
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
        .then((res) => res.json())
        .then((data) => {
            localStorage.setItem("access_token", data.access_token);
            dispatch(LOG_IN_FUNCTION())

        })
        .catch((error) => {
            console.error(error);
        });
};

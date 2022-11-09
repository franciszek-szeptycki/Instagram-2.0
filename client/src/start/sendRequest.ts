import { LOG_IN_FUNCTION } from '../redux/actions/isLogged'

export const sendRegisterForm = (data: object) => {
    
    console.log("before fetch:")
    console.log(data)
    console.log("after fetch:")
    
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

    console.log("before fetch:")
    console.log(data)
    console.log("after fetch:")

    fetch("/auth/log-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("ok:", data);
            dispatch(LOG_IN_FUNCTION())

        })
        .catch((error) => {
            console.error("not ok:", error);
        });
};

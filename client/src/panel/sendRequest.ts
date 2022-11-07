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

export const sendLoginForm = (data: object) => {

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
        })
        .catch((error) => {
            console.error("not ok:", error);
        });
};

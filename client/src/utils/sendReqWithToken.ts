// import { getToken } from "./jwt";

export const postCreatedPost = (data) => {
    fetch("/api/post/add", {
        method: "POST",
        headers: {},
        body: data,
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("ok: ", data);
        })
        .catch((error) => {
            console.error("not ok: ", error);
        });
};

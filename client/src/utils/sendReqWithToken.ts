// import { getToken } from "./jwt";

export const postCreatedPost = (data) => {
    console.log(data)
	fetch("/posts/create-new-post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("ok: ", data);
        })
        .catch((error) => {
            console.error("not ok: ", error);
        });
};
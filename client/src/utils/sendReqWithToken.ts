// import { getToken } from "./jwt";

export const postCreatedPost = (data) => {
    console.log(localStorage.getItem('jwt'))
	fetch("/api/post/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
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
export const postCreatedPost = (data) => {
    console.log(JSON.stringify(data))
	fetch("/api/post/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.access_token) {
                localStorage.setItem("access_token", data.access_token)
            }
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
        });
};
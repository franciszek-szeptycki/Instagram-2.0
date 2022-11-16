import getToken from "./getToken";

const reqServer = async (
    method: string,
    data: object,
    path: string,
    tokenRequired: boolean
) => {
    console.log(data);

    let headers: HeadersInit;
    if (tokenRequired) {
        headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        };
    } else {
        headers = { "Content-Type": "application/json" };
    }

    let fetchContent: object;
    if (method === "POST") {
        fetchContent = {
            method,
            headers,
            body: JSON.stringify(data),
        };
    } else if (method === "GET") {
        fetchContent = {
            method,
            headers,
        };
    }

    return await fetch(path, fetchContent)
        .then(async (res) => {
            const { status } = res;
            const { access_token, msg, data } = await res.json();

            if (access_token) {
                localStorage.setItem("access_token", access_token);
            }

            console.log(data);
            return {
                status,
                msg,
                data,
            };
        })
        .catch((error) => {
            console.error(error);
            return {
                status: 500,
                msg: "giant error...",
                data: "",
            };
        });
};

export type reqType = Awaited<ReturnType<typeof reqServer>>;

export default reqServer;

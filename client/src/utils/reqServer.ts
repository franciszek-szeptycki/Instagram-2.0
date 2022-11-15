import getToken from "./getToken";

const reqServer = async (method: string, data: object, path: string) => {
    console.log(data)
    return await fetch(path, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(data),
        })
        .then(async (res) => {
            const {status} = res
            const {access_token, msg, data} = await res.json();
            localStorage.setItem("access_token", access_token);
            console.log(data)
            return {
                status,
                msg,
                data,
            };
        })
        .catch((error) => {
            console.log(error.name);
            return {
                status: 500,
                msg: "giant error...",
                data: "",
            }
        });

}

export type reqType = Awaited<ReturnType<typeof reqServer>>

export default reqServer;
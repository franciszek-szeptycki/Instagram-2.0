import axios from 'axios'
import {getToken} from "./token";

const API = async (method: "GET" | "POST", path: string, body: any, token: boolean = true) => {
    const request: RequestType = {
        method,
        headers: {
            "Content-Type": "application/json",
        }
    }

    if (body) request["body"] = JSON.stringify(body)

    if (token) request.headers["Authorization"] = `Bearer ${getToken()}`

    let status: number = 0

    const { msg, data, access_token } = await fetch(path, request).then(res => {
        status = res.status
        return res.json()
    }).catch(() => status = 500)

    if(access_token) localStorage.setItem("access_token", access_token)

    console.log(status, msg, data, access_token)

    return { status, msg, data, access_token }
}

export default API

interface RequestType {
    method: "GET" | "POST"
    headers: {
        "Content-Type": "application/json",
        Authorization?: string
    }
    body?: any
}

export interface ResponseType {

}
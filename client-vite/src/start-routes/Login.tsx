import {useContext, useState} from "react";
import API from "../features/API";
// @ts-ignore
import {NotificationManager} from 'react-notifications'
import {AppContext} from "../context";
import {setUserInfo} from "../features/userInfo";
import './Login.sass'


export default () => {

    const {state, dispatch} = useContext(AppContext)

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const {status, msg, data, access_token} = await API("POST", "/auth/log-in", {email, password: pwd}, false)

        switch (status) {
            case 200:
                NotificationManager.success("Successfully logged in", "", 1000)
                const {user_name, image} = data
                setUserInfo(user_name, image, access_token)
                return dispatch({type: "SET_USER_LOGGED", item: true})
            default:
                NotificationManager.error(msg || "Connection error, try again later", "", 5000)
        }
    }

    return (
        <div data-testid="login" className="login">
            <form className="form" onSubmit={handleSubmit} >
                <label className="form__input-label">
                    <p>email</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="form__input-label">
                    <p>password</p>
                    <input value={pwd} type="password" onChange={(e) => setPwd(e.target.value)} />
                </label>
                <label className="form__submit-label">
                    <input type="submit" value="LOG IN" />
                    <a href="/register" >SIGN UP</a>
                </label>
            </form>
        </div>
    )
}

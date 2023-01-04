import {useState} from "react";
import checkUserData from "./assets/checkUserData";
import API from "../features/API";
// @ts-ignore
import {NotificationManager} from 'react-notifications'
import './Register.sass'
import img from "./assets/road.jpg"

export default () => {

    const [email, setEmail] = useState("")
    const [usrn, setUsrn] = useState("")
    const [pwd, setPwd] = useState("")
    const [pwd2, setPwd2] = useState("")


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if(!checkUserData(email, usrn, pwd, pwd2)) return

        const body = {email, username: usrn, password: pwd}

        const {status, msg, data} = await API("POST", "/auth/sign-up", body, false)

        switch (status) {
            case 201:
                NotificationManager.success(msg, "", 3000)
                break
            default:
                NotificationManager.error(msg, "", 3000)
        }
    }
    
    return (
        <div data-testid="register" className="register">

            <img className="register-img" src={img} />

            <form className="form" onSubmit={handleSubmit} >
                <label className="form__input-label" >
                    <p>email</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label className="form__input-label" >
                    <p>username</p>
                    <input value={usrn} onChange={(e) => setUsrn(e.target.value)} />
                </label>
                <label className="form__input-label" >
                    <p>password</p>
                    <input value={pwd} type="password" onChange={(e) => setPwd(e.target.value)} />
                </label>
                <label className="form__input-label" >
                    <p>password again</p>
                    <input value={pwd2} type="password" onChange={(e) => setPwd2(e.target.value)} />
                </label>
                <label className="form__submit-label" >
                    <input type="submit" value="SIGN UP" />
                    <a href='/' >LOG IN</a>
                </label>
            </form>
        </div>
    )
}
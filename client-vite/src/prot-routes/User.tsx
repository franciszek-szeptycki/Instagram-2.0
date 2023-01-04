import {getUserInfo} from "../features/userInfo";
import {useQuery} from "react-query";
import API from "../features/API";
import {useState} from "react";
import './User.sass'
import SearchEngine from "../components/SearchEngine";

export default () => {
    const {pathname} = window.location
    const id = pathname.replace("/user/", "")

    const myProfile: boolean = id === getUserInfo().id

    const [userData, setUserData] = useState<UserDataType>()

    useQuery("load-user-info", () => API("GET",`/api/user/${id}`, null), {
        onSuccess: ({data}: { data: UserDataType }) => setUserData(data)
    })

    // useQ

    console.log()

    return (
        <main className="main">
            <SearchEngine/>
            <div className="wrapper">
                <div className="user">
                    <img className="user__img" src={userData?.image} />
                    <div className="user__info" >
                        <p>{userData?.username}</p>
                    </div>
                </div>
            </div>
        </main>

    )
}


interface UserDataType {
    username: string,
    email: string,
    image: string
}

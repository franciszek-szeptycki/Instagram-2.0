import {getUserInfo} from "../features/userInfo";
import {useQuery} from "react-query";
import API from "../features/API";
import {useState} from "react";
import './User.sass'
import SearchEngine from "../components/SearchEngine";
import Post, {PostType} from "../components/Post";
import Spinner from "../components/Spinner";

export default () => {
    const {pathname} = window.location
    const id = pathname.replace("/user/", "")

    const myProfile: boolean = id === getUserInfo().id

    const [userData, setUserData] = useState<UserDataType>()
    const [posts, setPosts] = useState<PostType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const loadUserInfo = useQuery("load-user-info", () => API("GET",`/api/user/${id}`, null), {
        onSuccess: ({data}: { data: UserDataType }) => setUserData(data)
    })

    const loadUserPost = useQuery("load-user-post", () => API("GET",`/api/user/${id}/posts`, null), {
        onSuccess: ({data}: { data: PostType[] }) => {
            setPosts(data)
            setIsLoading(false)
        }
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
            {posts.length ? <>
                    <ul className="wrapper">
                        {posts.map((item: PostType, key: number) => <Post key={key} data={item}/>)}
                    </ul>
                    <div className="post-footer">
                        {isLoading && <Spinner x={50} y={50}/>}
                    </div>
                </>
                : <Spinner x={50} y={50} />}
        </main>

    )
}


interface UserDataType {
    username: string,
    email: string,
    image: string
}

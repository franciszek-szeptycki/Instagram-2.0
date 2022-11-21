import { useQuery } from "react-query";
import LoadingPost from "../../components/render-post/LoadingPost";
import RenderPosts from "../../components/render-post/RenderPosts";
import { getUserId } from "../../utils/getToken";
import reqServer from "../../utils/reqServer";
import Error404 from "../error/Error404";
import "./UserProfile.sass";

const UserProfile = () => {
    const basicPath = "/users/";
    const userId = window.location.pathname.replace(basicPath, "");
    
    if (getUserId() === Number(userId)) window.location.pathname = "/profile"

    const profile = useQuery("users", () =>
        reqServer("GET", null, `/api/user/${userId}`, true)
    );

    const posts = useQuery("users-posts", () =>
        reqServer("GET", null, `/api/user/${userId}/posts`, true)
    );

    try {
        if (!profile.isLoading && profile.data.status !== 200) return <Error404 data="user" />;
    } catch {}

    return (
        <div className="page page-user-profile">
            <aside className="aside">
                <div className="profile">
                    <div
                        className={`profile__photo ${
                            true ? "loading-content" : ""
                        }`}
                    >
                        {!profile.isLoading && (
                            <img src={profile.data.data.image} alt="" />
                        )}
                    </div>
                    <ul className="profile__ul">
                        <li className="profile__li">
                            <strong>Username: </strong>
                            <p>{!profile.isLoading && profile.data.data.username}</p>
                        </li>
                        <li className="profile__li">
                            <strong>E-mail adress: </strong>
                            <p>{!profile.isLoading && profile.data.data.email}</p>
                        </li>
                    </ul>
                </div>
            </aside>
            <main className="main">
                {!posts.isLoading ? <RenderPosts data={posts.data} /> : <LoadingPost/>}
            </main>
        </div>
    );
};

export default UserProfile;
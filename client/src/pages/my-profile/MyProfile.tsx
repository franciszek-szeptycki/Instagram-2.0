import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOG_OUT_FUNCTION } from "../../redux/actions/isLogged";
import reqServer from "../../utils/reqServer";
import { getUserInfo, setUserInfo } from "../../utils/userInfo";
import "./Profile.sass";
import { useQuery } from "react-query";
import RenderPosts from "../../components/render-post/RenderPosts";
import LoadingPost from "../../components/render-post/LoadingPost";

const MyProfile = () => {
    const dispatch = useDispatch();

    const [file, setFile] = useState<File>();

    const handleSave = async () => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", async () => {
            const imgData = {
                img: reader.result,
            };
            const { status, msg, data } = await reqServer(
                "POST",
                imgData,
                "/api/user/image/add",
                true
            );
            console.log(status);
            if (status === 201)
                setUserInfo({ user_name: null, image: reader.result });
                window.location.reload()
        });
    };

    const handleLogOut = () => {
        localStorage.removeItem("access_token");
        dispatch(LOG_OUT_FUNCTION());
    };

    const { userId } = getUserInfo();

    const profile = useQuery("users", () =>
        reqServer("GET", null, `/api/user/${userId}`, true)
    );

    const posts = useQuery("users-posts", () =>
        reqServer("GET", null, `/api/user/${userId}/posts`, true)
    );

    const profileIsReady = profile.status === "success"

    return (
        <div className="page page-profile">
            <aside className="aside">
                <div className="profile">
                    <div
                        className={`profile__photo ${
                            profileIsReady ? "loading-content" : ""
                        }`}
                    >
                        <img
                            src={profileIsReady ? profile.data.data.image : ""}
                            alt=""
                            className="profile__photo-current-photo"
                        />
                        <label className="profile__photo-upload">
                            {file && (
                                <img
                                    className="profile__photo-upload-show"
                                    src={URL.createObjectURL(file)}
                                />
                            )}
                            <input
                                className="profile__photo-upload-input"
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </label>
                    </div>
                    <ul className="profile__ul">
                        <li className="profile__li">
                            <strong>Username: </strong>
                            <p>
                                {profileIsReady &&
                                    profile.data.data.username}
                            </p>
                        </li>
                        <li className="profile__li">
                            <strong>E-mail adress: </strong>
                            <p>
                                {profileIsReady && profile.data.data.email}
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="user-panel">
                    <div className="user-panel-buttons">
                        <button
                            className="user-panel-buttons-btn"
                            onClick={handleSave}
                        >
                            save
                        </button>
                        <button
                            className="user-panel-buttons-btn"
                            onClick={handleLogOut}
                        >
                            log out
                        </button>
                    </div>
                </div>
            </aside>
            <main className="main">
                {!posts.isLoading ? (
                    <RenderPosts data={posts.data} owner={true} />
                ) : (
                    <LoadingPost />
                )}
            </main>
        </div>
    );
};

export default MyProfile;

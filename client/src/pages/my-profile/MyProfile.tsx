import { useState } from "react";
import { useDispatch } from "react-redux";
import { LOG_OUT_FUNCTION } from "../../redux/actions/isLogged";
import reqServer from "../../utils/reqServer";
import { getUserInfo, setUserInfo } from "../../utils/userInfo";
import "./Profile.sass";

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
            localStorage.removeItem("access_token");
            dispatch(LOG_OUT_FUNCTION());
        });
    };

    const handleLogOut = () => {
        localStorage.removeItem("access_token");
        dispatch(LOG_OUT_FUNCTION());
    };

    const { username, image } = getUserInfo();

    return (
        <div className="page page-profile">
            <aside className="aside">
                <div className="profile">
                    <div className="profile__photo">
                        <img
                            src={image}
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
                    <div className="profile__data">
                        <p className="profile__data-username">
                            <span>username:</span> {username}
                        </p>
                    </div>
                </div>
            </aside>
            <main className="main">
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
            </main>
        </div>
    );
};

export default MyProfile;

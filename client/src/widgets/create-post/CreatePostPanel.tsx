import { useState } from "react";
import { useDispatch } from "react-redux";
import { CREATE_POST_OFF_FUNCTION } from "../../redux/actions/createPostPanel";
import "./CreatePostPanel.sass";
import ProfileIdentity from "../../components/profile-identifier/ProfileIdentity";
import reqServer from "../../utils/reqServer";
import { getUserInfo } from "../../utils/userInfo";
import File from "./File";
import Description from "./Description";
import Hashtags from "./Hashtags";

const CreatePostPanel = () => {
    const dispatch = useDispatch();

    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [hashtag1, setHashtag1] = useState("");
    const [hashtag2, setHashtag2] = useState("");
    const [hashtag3, setHashtag3] = useState("");

    const handleHashtag1 = (text: string) => {
        setHashtag1(text.replace(" ", "_"));
    };
    const handleHashtag2 = (text: string) => {
        setHashtag2(text.replace(" ", "_"));
    };
    const handleHashtag3 = (text: string) => {
        setHashtag3(text.replace(" ", "_"));
    };

    const handleShareButton = async () => {
        dispatch(CREATE_POST_OFF_FUNCTION());

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.addEventListener("load", (): void => {
            const data = {
                img: reader.result,
                description,
                hashtag: [hashtag1, hashtag2, hashtag3],
            };

            reqServer("POST", data, "/api/posts/add", true);

            document.location.reload();
        });
    };

    const [page, setPage] = useState(1);

    const handleArrow = (direction: "right" | "left"): void => {
        switch (direction) {
            case "right":
                if (page + 1 > 3) return;
                return setPage((prev) => prev + 1);
            case "left":
                if (page - 1 < 1) return
                return setPage((prev) => prev - 1);
        }
    };
    return (
        <div className="create-post-bg">
            <div className="create-post">
                {/* <button
                    className="create-post__share-btn"
                    onClick={handleShareButton}
                >
                    share
                </button> */}

                <div className="create-post__main">
                    <div className="create-post__arrow">
                        <div
                            className="create-post__arrow-left"
                            onClick={() => handleArrow("left")}
                        >
                            <i className="fa-solid fa-play"></i>
                        </div>
                    </div>
                    <div className="create-post__label">
                        <div className={`create-post__label-container create-post__label-container-${page}`}>
                            <File data={{ file, setFile }} />
                            <Description />
                            <Hashtags />
                        </div>
                    </div>
                    <div className="create-post__arrow">
                        <div
                            className="create-post__arrow-right"
                            onClick={() => handleArrow("right")}
                        >
                            <i className="fa-solid fa-play"></i>
                        </div>
                    </div>
                    {/*
                    <div className="create-post__info">

                        <ProfileIdentity data={getUserInfo()} />
                
                        <label className="create-post__info-hashtags">
                            <p className="create-post__info-name">
                                Add # to your post
                            </p>
                            <div className="create-post__info-hashtag">
                                #
                                <input
                                    onChange={(e) =>
                                        handleHashtag1(e.target.value)
                                    }
                                    value={hashtag1}
                                    className="create-post__info-hashtag-input"
                                    type="text"
                                />
                            </div>
                            <div className="create-post__info-hashtag">
                                #
                                <input
                                    onChange={(e) =>
                                        handleHashtag2(e.target.value)
                                    }
                                    value={hashtag2}
                                    className="create-post__info-hashtag-input"
                                    type="text"
                                />
                            </div>
                            <div className="create-post__info-hashtag">
                                #
                                <input
                                    onChange={(e) =>
                                        handleHashtag3(e.target.value)
                                    }
                                    value={hashtag3}
                                    className="create-post__info-hashtag-input"
                                    type="text"
                                />
                            </div>
                        </label>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default CreatePostPanel;

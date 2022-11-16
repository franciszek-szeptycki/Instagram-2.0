import { useState } from "react";
import { useDispatch } from "react-redux";
import { CREATE_POST_OFF_FUNCTION } from "../../redux/actions/createPostPanel";
import "../Panel.sass";
import ProfileIdentity from "../../components/profile-identifier/ProfileIdentity";
import reqServer from "../../utils/reqServer"

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

        const reader = new FileReader();

        reader.readAsDataURL(file)

        reader.addEventListener("load", () => {

            const data = {
                img: reader.result,
                description,
                hashtag: [hashtag1, hashtag2, hashtag3],
            };
            reqServer("POST", data, "/api/posts/add", true);
        })
    };

    return (
        <div className="create-post-bg">
            <div className="create-post">
                <button
                    className="create-post__share-btn"
                    onClick={handleShareButton}
                >
                    share
                </button>
                <div className="create-post__header">
                    <p className="create-post__title">Create new post</p>
                </div>
                <div className="create-post__main">
                    <label className="create-post__upload">
                        {file && (
                            <img
                                className="create-post__upload-show"
                                src={URL.createObjectURL(file)}
                            />
                        )}
                        <input
                            className="create-post__upload-input"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
                    <div className="create-post__info">
                        <ProfileIdentity />
                        <label className="create-post__info-description">
                            <p className="create-post__info-name">
                                Add description to your post
                            </p>
                            <textarea
                                className="create-post__info-textarea"
                                cols={30}
                                rows={10}
                                placeholder="description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </label>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePostPanel;

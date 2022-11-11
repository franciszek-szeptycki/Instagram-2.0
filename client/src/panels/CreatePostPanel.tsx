import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CREATE_POST_OFF_FUNCTION } from "../redux/actions/createPostPanel";
import "./Panel.sass";
import ProfileIdentity from "../components/ProfileIdentity";
import { postCreatedPost } from "../utils/sendReqWithToken";

const CreatePostPanel = () => {
    const dispatch = useDispatch();

    // const [fileURL, setFileURL] = useState("");
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [hashtag1, setHashtag1] = useState("");
    const [hashtag2, setHashtag2] = useState("");
    const [hashtag3, setHashtag3] = useState("");

    const handleClosePanel = () => {
        dispatch(CREATE_POST_OFF_FUNCTION());
    };

    // const handlefile = (e) => {
    //     setFileURL(e.target.files[0]);
    // };

    const handleHashtag1 = (text) => {
        setHashtag1(text.replace(" ", "_"));
    };
    const handleHashtag2 = (text) => {
        setHashtag2(text.replace(" ", "_"));
    };
    const handleHashtag3 = (text) => {
        setHashtag3(text.replace(" ", "_"));
    };

    const handleShareButton = () => {
        const data = new FormData();
        data.append("file", file);
        data.append("description", description);
        data.append("hashtags", `${hashtag1} ${hashtag2} ${hashtag3}`);
        console.log(data)

        postCreatedPost({ data });
    };

    return (
        <div className="create-post-bg">
            <button
                onClick={handleClosePanel}
                className="create-post__close-btn"
            >
                x
            </button>
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
                        {/* {file && (
                            <img
                                className="create-post__upload-show"
                                src={URL.createObjectURL(file)}
                            />
                        )} */}
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
                                    id="0"
                                    onChange={(e) =>
                                        handleHashtag1(e.target.value)
                                    }
                                    className="create-post__info-hashtag-input"
                                    type="text"
                                />
                            </div>
                            <div className="create-post__info-hashtag">
                                #
                                <input
                                    id="1"
                                    onChange={(e) =>
                                        handleHashtag2(e.target.value)
                                    }
                                    className="create-post__info-hashtag-input"
                                    type="text"
                                />
                            </div>
                            <div className="create-post__info-hashtag">
                                #
                                <input
                                    id="2"
                                    onChange={(e) =>
                                        handleHashtag3(e.target.value)
                                    }
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

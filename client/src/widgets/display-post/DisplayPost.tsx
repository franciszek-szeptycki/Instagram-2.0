import { useQuery } from "react-query";
import "./DisplayPost.sass";
import allReducers from "../../redux/reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HIDE_POST_FUNCTION } from "../../redux/actions/displayPost";
import reqServer from "../../utils/reqServer";
import { useState } from "react";
import Spinner from "../../components/animations/Spinner";
import ProfileIdentity from "../../components/profile-identifier/ProfileIdentity";

const DisplayPost = () => {
    const postID = useSelector<ReturnType<typeof allReducers>>(
        (state) => state.displayPost.postID
    );

    const postUpdatedAt = 0;

    const [] = useState(false);
    const [isPostReady, setIsPostReady] = useState(false);
    const [isPostUpdated, setIsPostUpdated] = useState(false);

    const dispatch = useDispatch();

    const handleHidePost = () => {
        setIsPostReady(false);
        dispatch(HIDE_POST_FUNCTION());
    };

    const post = useQuery("display-post", () =>
        reqServer("GET", null, `/api/posts/get/${postID}`)
    );

    const comments = useQuery("display-comments", () =>
        reqServer("GET", null, `/api/comments/get/${postID}`)
    );

    if (!isPostReady && !post.isRefetching && post.status === "success") {
        setIsPostReady(true);
    }
    if (isPostReady && post.data.status === 200) {
        // comments.data.data.comments.map((item) => console.log(item));
        console.log(comments.data)
    }

    return (
        <>
            <div className="display-post-bg">
                <div className="display-post">
                    <button
                        className="display-post__hide-btn"
                        onClick={handleHidePost}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <div className="display-post__item display-post__item-1">
                        <div className="display-post__photo">
                            {isPostReady ? (
                                <img
                                    src={post.data.data.file}
                                    alt="post content"
                                />
                            ) : (
                                <Spinner />
                            )}
                        </div>
                    </div>
                    <div className="display-post__item display-post__item-2">
                        {isPostReady ? (
                            <ProfileIdentity
                                data={{
                                    username: post.data.data.user_name,
                                    image: post.data.data.image,
                                }}
                            />
                        ) : (
                            <div className="loading-post__top">
                                <div className="loading-post__top-photo loading-content"></div>
                                <div className="loading-post__top-title loading-content"></div>
                            </div>
                        )}
                        <div className="description">
                            {isPostReady && post.data.data.description}
                        </div>
                        <div className="add-comment">
                            <form>
                                <input type="text" />
                                <input type="submit" />
                            </form>
                        </div>
                        <ul className="comments">
                            {/* {isPostReady && post.data.status === 200 && post.data.data.map(item => <li className="comments__comment"></li>)} */}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DisplayPost;

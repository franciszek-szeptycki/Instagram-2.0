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
import AddComment from "./AddComment";

const DisplayPost = () => {
    const postID = useSelector<ReturnType<typeof allReducers>>(
        (state) => state.displayPost.postID
    );

    const [] = useState(false);
    const [isPostReady, setIsPostReady] = useState(false);
    const [isCommentsReady, setIsCommentsReady] = useState(false);

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

    const refetchComments = () => {
        // setTimeout(() => comments.refetch(), 1000)
        comments.refetch();
    };

    if (!isPostReady && !post.isRefetching && post.status === "success") {
        setIsPostReady(true);
    }

    if (
        !isCommentsReady &&
        !comments.isRefetching &&
        comments.status === "success"
    ) {
        setIsCommentsReady(true);
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
                            <AddComment
                                id={postID}
                                refetchComments={refetchComments}
                            />
                        </div>
                        <ul className="comments">
                            {isCommentsReady &&
                                comments.data.data &&
                                [...comments.data.data].reverse().map((item) => (
                                    <li key={item.id} className="comment">
                                        <div className="comment__author">
                                            <div className="comment__author-photo">
                                                <img
                                                    src={item.owner_image}
                                                    alt="author's profile photo"
                                                />
                                            </div>
                                            <p className="comment__author-username">
                                                {item.user_name}
                                            </p>
                                        </div>
                                        <p className="comment__content">
                                            {item.comment}
                                        </p>
                                    </li>
                                ))}
                        </ul>
                        {/* <div className="comment__placeholder"></div> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DisplayPost;

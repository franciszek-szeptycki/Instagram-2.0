import { useState } from "react";
import { useDispatch } from "react-redux";
import { SHOW_POST_FUNCTION } from "../../redux/actions/displayPost";
import reqServer from "../../utils/reqServer";
import ProfileIdentity from "../profile-identifier/ProfileIdentity";

const Post = ({ data, owner }) => {
    const [isPostLiked, setIsPostLiked] = useState(data.liked);
    const [likesAmount, setLikesAmount] = useState(data.likes);
    const [isUserFollowed, setIsUserFollowed] = useState(data.followed);
    const dispatch = useDispatch();

    const handleLikesCounter = (arg: boolean) => {
        switch (arg) {
            case true:
                return setLikesAmount((prev) => (prev -= 1));
            case false:
                return setLikesAmount((prev) => (prev += 1));
        }
    };

    const handleFollowIcon = (arg: boolean) => {
        switch (arg) {
            case true:
                return setIsUserFollowed((prev) => (prev -= 1));
            case false:
                return setIsUserFollowed((prev) => (prev += 1));
        }
    };

    const handleLikeButton = async () => {
        setIsPostLiked((prev) => !prev);
        handleLikesCounter(isPostLiked);

        const { status, msg } = await reqServer(
            "GET",
            null,
            `/api/likes/add/${data.id}`,
            true
        );
        if (status !== 201) {
            handleLikesCounter(!isPostLiked);
            setIsPostLiked((prev) => !prev);
        }
    };

    const handleShowPost = () => {
        dispatch(SHOW_POST_FUNCTION(data.id));
        console.log(data);
    };

    const handleFollowUser = async () => {
        setIsUserFollowed((prev) => !prev);
        handleFollowIcon(isUserFollowed);
        const { status } = await reqServer(
            "POST",
            null,
            `/api/followers/add/${data.owner_id}`
        );
        if (status !== 201) {
            handleFollowIcon(!isUserFollowed);
            setIsUserFollowed((prev) => !prev);
        }
    };

    // console.log(data)

    return (
        <div className="post">
            {owner && (
                <div className="post__delete">
                    <i className="fa-regular fa-trash-can"></i>
                </div>
            )}
            <div className="post__header">
                <ProfileIdentity
                    data={{
                        username: data.user_name,
                        image: data.owner_image,
                        owner_id: data.owner_id,
                    }}
                />
            </div>
            <div className="post__main">
                <div className="post__main-img">
                    <img
                        src={data.file}
                        alt="post content"
                        onClick={handleShowPost}
                    />
                </div>
            </div>
            <div className="post__footer">
                <div className="post__footer-top">
                    <div className="post__footer-top-interactions">
                        <button
                            className="post__footer-top-interactions-btn"
                            onClick={handleShowPost}
                        >
                            <i className="fa-regular fa-comment"></i>
                        </button>
                        <p className="post__footer-top-interactions-counter">
                            {data.comments}
                        </p>
                        <button
                            className="post__footer-top-interactions-btn"
                            onClick={handleFollowUser}
                        >
                            <i
                                className={`fa-solid fa-eye ${
                                    isUserFollowed ? "green" : ""
                                }`}
                            ></i>
                        </button>
                        <button
                            className="post__footer-top-interactions-btn"
                            onClick={handleLikeButton}
                        >
                            <i
                                className={`fa-heart fa-${
                                    isPostLiked ? "solid liked" : "regular"
                                }`}
                            ></i>
                        </button>

                        <p className="post__footer-top-interactions-counter">
                            {likesAmount}
                        </p>
                        {/* <button className="post__footer-top-interactions-btn">
                            <i className="fa-regular fa-envelope"></i>
                        </button> */}
                    </div>
                    <p className="post__footer-top-date">
                        {data.date
                            ? `${data.date.split(" ")[1]} ${
                                  data.date.split(" ")[2]
                              } ${data.date.split(" ")[3]}`
                            : ""}
                    </p>
                </div>
                <div className="post__footer-hashtags">
                        {data.hashtags.map((item: string) => {
                            if (item)
                                return (
                                    <p className="post__footer-hashtags-item" id={item}>
                                        {item}
                                    </p>
                                );
                        })}
                    </div>
                <p className="post__footer-description">{data.description}</p>
            </div>
        </div>
    );
};

export default Post;

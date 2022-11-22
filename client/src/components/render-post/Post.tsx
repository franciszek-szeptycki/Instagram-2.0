import { useState } from "react";
import reqServer from "../../utils/reqServer";
import ProfileIdentity from "../profile-identifier/ProfileIdentity";

const Post = ({ data, owner }) => {
    console.log(data)
    const [isPostLiked, setIsPostLiked] = useState(data.liked);
    const [likesAmount, setLikesAmount] = useState(data.likes);

    const handleLikesCounter = (arg: boolean) => {
        switch (arg) {
            case true:
                return setLikesAmount((prev) => (prev -= 1));
            case false:
                return setLikesAmount((prev) => (prev += 1));
        }
    };

    const handleLikeButton = async () => {
        setIsPostLiked((prev) => !prev);
        handleLikesCounter(isPostLiked);

        // PO UZGODNIENU
        // const { status } = await reqServer("POST", null, `/api/likes/add/${data.id}`, true)
        const { status, msg } = await reqServer(
            "GET",
            null,
            `/api/likes/add/${data.id}`,
            true
        );
        console.log(status, msg);
        if (status !== 201) {
            handleLikesCounter(!isPostLiked);
            setIsPostLiked(prev => !prev)
        }
    };

    return (
        <div className="post">
            {owner && (
                <div className="post__delete">
                    <i className="fa-regular fa-trash-can"></i>
                </div>
            )}
            <div className="post__header">
                <ProfileIdentity
                    data={{ username: data.user_name, image: data.owner_image }}
                />
            </div>
            <div className="post__main">
                <div className="post__main-img">
                    <img src={data.file} alt="" />
                </div>
            </div>
            <div className="post__footer">
                <div className="post__footer-top">
                    <div className="post__footer-top-interactions">
                        <button className="post__footer-top-interactions-btn">
                            <i className="fa-regular fa-comment"></i>
                        </button>
                        <button className="post__footer-top-interactions-btn">
                            <i className="fa-solid fa-eye"></i>
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

                        <p className="post__footer-top-interactions-likes">
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
                <p className="post__footer-description">{data.description}</p>
            </div>
        </div>
    );
};

export default Post;

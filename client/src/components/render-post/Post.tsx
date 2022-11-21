import ProfileIdentity from "../profile-identifier/ProfileIdentity";

const Post = ({ data, owner }) => {
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
                    <img loading="lazy" src={data.file} alt="" />
                </div>
            </div>
            <div className="post__footer">
                <div className="post__footer-top">
                    <div className="post__footer-top-interactions">
                        <button className="post__footer-top-interactions-btn">
                            <i className="fa-regular fa-comment"></i>
                        </button>
                        <button className="post__footer-top-interactions-btn">
                            <i className="fa-regular fa-heart"></i>
                        </button>
                        <button className="post__footer-top-interactions-btn">
                            <i className="fa-solid fa-eye"></i>
                        </button>
                        <button className="post__footer-top-interactions-btn">
                            <i className="fa-regular fa-envelope"></i>
                        </button>
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

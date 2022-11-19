import "./LoadingPost.sass";

const LoadingPost = () => {
    return (
        <div className="loading-post">
            <div className="loading-post__top">
                <div className="loading-post__top-photo animate"></div>
                <div className="loading-post__top-title animate"></div>
            </div>
            <div className="loading-post__mid animate"></div>
            <div className="loading-post__bottom">
                <div className="loading-post__bottom-icons">
                    <div className="loading-post__bottom-icons-icon animate"></div>
                    <div className="loading-post__bottom-icons-icon animate"></div>
                    <div className="loading-post__bottom-icons-icon animate"></div>
                    <div className="loading-post__bottom-icons-icon animate"></div>
                </div>
                <div className="loading-post__bottom-date animate"></div>
            </div>
        </div>
    );
};

export default LoadingPost;

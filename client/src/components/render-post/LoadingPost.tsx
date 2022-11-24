import "./LoadingPost.sass";

const LoadingPost = () => {
    return (
        <div className="loading-post">
            <div className="loading-post__top">
                <div className="loading-post__top-photo loading-content"></div>
                <div className="loading-post__top-title loading-content"></div>
            </div>
            <div className="loading-post__mid loading-content"></div>
            <div className="loading-post__bottom">
                <div className="loading-post__bottom-icons">
                    <div className="loading-post__bottom-icons-icon loading-content"></div>
                    <div className="loading-post__bottom-icons-icon loading-content"></div>
                    <div className="loading-post__bottom-icons-icon loading-content"></div>
                </div>
                <div className="loading-post__bottom-date loading-content"></div>
            </div>
        </div>
    );
};

export default LoadingPost;

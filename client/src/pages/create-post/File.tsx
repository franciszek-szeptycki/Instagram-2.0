const File = (props) => {
    const { file, setFile } = props.data;

    return (
        <div className="create-post__label-item create-post__label-item-1">
            <div className="create-post__upload-wrapper">
                <p className="create-post__upload-name mobile">
                    {file && file.name}
                </p>
                <label className="create-post__upload">
                    <p className="create-post__upload-text mobile">
                        <i className="fa-regular fa-image"></i>choose a photo
                    </p>
                    <input
                        className="create-post__upload-input"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <div className="create-post__upload-photo desktop">
                        <p className="create-post__upload-photo-text">
                            <i className="fa-regular fa-image"></i>
                        </p>
                        <img
                            className="create-post__upload-photo-img"
                            src={file && URL.createObjectURL(file)}
                        />
                    </div>
                </label>
            </div>
        </div>
    );
};

export default File;

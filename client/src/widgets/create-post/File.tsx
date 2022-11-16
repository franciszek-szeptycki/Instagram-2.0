const File = (props) => {
    const { file, setFile } = props;
    return (
        <div className="create-post__label-item">
            <label className="create-post__upload">
                choose a photo
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
            <p className="create-post__upload-name">{file ? file: "choose a photo"}</p>
        </div>
    );
};

export default File;
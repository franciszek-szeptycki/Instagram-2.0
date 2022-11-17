const File = (props) => {
    const { file, setFile } = props.data;

    return (
        <div className="create-post__label-item">
            <div className="create-post__upload-wrapper">
                <p className="create-post__upload-name">{file ? file.name : " "}</p>
                <label className="create-post__upload">
                    {/* <button className="create-post__upload-btn"> */}
                    <i className="fa-regular fa-image"></i>choose a photo
                    {/* </button> */}
                    <input
                        className="create-post__upload-input"
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </label>
            </div>
        </div>
    );
};

export default File;

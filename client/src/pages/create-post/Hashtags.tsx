import { useRef } from "react";

interface hashtags {
    "1": string;
    "2": string;
    "3": string;
}

const Hashtags = (props) => {
    const { hashtags, setHashtags, handleShareButton } = props.data;

    const input1 = useRef(null);
    const input2 = useRef(null);
    const input3 = useRef(null);

    const updateInputs = () => {
        input1.current.value = hashtags[1];
        input2.current.value = hashtags[2];
        input3.current.value = hashtags[3];
    };

    const handleInputChange = (target) => {
        const { value, id } = target;

        if (value.includes(" ") || value.includes("#")) return updateInputs();

        let newHashtags: hashtags = hashtags;
        newHashtags[id] = value;

        setHashtags(newHashtags);

        updateInputs();
    };

    return (
        <div className="create-post__label-item create-post__label-item-3">
            <div className="create-post__hashtags">
                <label className="create-post__hashtags-label">
                    #
                    <input
                        id="1"
                        type="text"
                        className="create-post__hashtags-input"
                        onChange={(e) => handleInputChange(e.target)}
                        ref={input1}
                    />
                </label>
                <label className="create-post__hashtags-label">
                    #
                    <input
                        id="2"
                        type="text"
                        className="create-post__hashtags-input"
                        onChange={(e) => handleInputChange(e.target)}
                        ref={input2}
                    />
                </label>
                <label className="create-post__hashtags-label">
                    #
                    <input
                        id="3"
                        type="text"
                        className="create-post__hashtags-input"
                        onChange={(e) => handleInputChange(e.target)}
                        ref={input3}
                    />
				</label>
				<button onClick={(e) => handleShareButton(e)} className="create-post__hashtags-submit">share the post</button>
            </div>
        </div>
    );
};

export default Hashtags;

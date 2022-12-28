import { useState } from "react";
import "./CreatePostPanel.sass";
import reqServer from "../../utils/reqServer";
import File from "./File";
import Description from "./Description";
import Hashtags from "./Hashtags";

const CreatePostPanel = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("");
    const [hashtags, setHashtags] = useState({ 1: "", 2: "", 3: "" });

    const handleShareButton = async (e) => {
        // e.preventDefault()
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.addEventListener("load", async () => {
            const data = {
                img: reader.result,
                description,
                hashtag: [hashtags[1], hashtags[2], hashtags[3]],
            };

            const {status} = await reqServer("POST", data, "/api/posts/add", true);
            if(status === 201) document.location.pathname = ""
        });
    };

    const [page, setPage] = useState(1);

    const handleArrow = (direction: "right" | "left"): void => {
        switch (direction) {
            case "right":
                if (page + 1 > 3) return;
                return setPage((prev) => prev + 1);
            case "left":
                if (page - 1 < 1) return;
                return setPage((prev) => prev - 1);
        }
    };

    return (
            <div className="create-post">
                <div className="create-post__main">
                    <div className={`create-post__arrow ${page === 1 ? "hide" : ""}`}>
                        <div
                            className="create-post__arrow-left"
                            onClick={() => handleArrow("left")}
                        >
                            <i className="fa-solid fa-play"></i>
                        </div>
                    </div>
                    <div className="create-post__label">
                        <div
                            className={`create-post__label-container create-post__label-container-${page}`}
                        >
                            <File data={{ file, setFile }} />
                            <Description
                                data={{ description, setDescription }}
                            />
                            <Hashtags
                                data={{
                                    hashtags,
                                    setHashtags,
                                    handleShareButton,
                                }}
                            />
                        </div>
                    </div>
                    <div className={`create-post__arrow ${page === 3 ? "hide" : ""}`}>
                        <div
                            className="create-post__arrow-right"
                            onClick={() => handleArrow("right")}
                        >
                            <i className="fa-solid fa-play"></i>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default CreatePostPanel;

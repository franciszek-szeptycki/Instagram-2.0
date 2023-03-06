import { useState } from "react";
import API from "../features/API";

export default () => {
    
    const [file, setFile] = useState<any>();
    const [description, setDescription] = useState<string>("");
    const [hashtag, setHashtag] = useState<string[]>(["", "", ""]);

    const handleShareButton = async () => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener("load", async () => {
            const img = reader.result
            const data = { img, description, hashtag };

            const {status} = await API("POST", "/api/posts/add", data);
            if(status === 201) document.location.pathname = ""
        });
    };

    
    return (
        <div className="create-post">
            <div className="form">
            <form>
                <input type="file" onChange={(e: any) => setFile(e.target.files[0])} />
                <textarea onChange={(e: any) => setDescription(e.target.value)} />
                <div className="hashtag">
                    {hashtag.map((item, index) => (
                        <div key={index} className="hashtag__item">
                            <input type="text" value={item} onChange={(e) => {   
                                const newHashtag = [...hashtag];
                                newHashtag[index] = e.target.value;
                                setHashtag(newHashtag);
                            }} />
                            <button type="button" onClick={(e) => {
                                const newHashtag = [...hashtag];
                                newHashtag.splice(index, 1);
                                setHashtag(newHashtag);
                            }} >Delete</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => setHashtag([...hashtag, ""])}>Add Hashtag</button>
                </div>
                <button type="submit" onClick={handleShareButton}>Submit</button>
            </form>
            </div>
        </div>
    );
};

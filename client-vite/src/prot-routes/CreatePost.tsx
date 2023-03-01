import { useState } from "react";

export default () => {
    
    const [hashtags, setHashtags] = useState<string[]>(["", "", ""]);

    
    return (
        <div className="create-post">
            <div className="form">
            <form>
                <input type="file" />
                <textarea />
                <div className="hashtags">
                    {hashtags.map((hashtag, index) => (
                        <div className="hashtag__item">
                            <input key={index} type="text" value={hashtag} onChange={(e) => {   
                                const newHashtags = [...hashtags];
                                newHashtags[index] = e.target.value;
                                setHashtags(newHashtags);
                            }} />
                            <button type="button" onClick={(e) => {
                                const newHashtags = [...hashtags];
                                newHashtags.splice(index, 1);
                                setHashtags(newHashtags);
                            }} >Delete</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => setHashtags([...hashtags, ""])}>Add Hashtag</button>
                </div>
                <button type="submit">Submit</button>
            </form>
            </div>
        </div>
    );
};

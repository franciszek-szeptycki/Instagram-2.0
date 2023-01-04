import "./Post.sass"
import PostPanel, {PostPanelType} from "./PostPanel";
import {useState} from "react";
import {TriangleDown, TriangleUp} from "../assets/icons";


export default ({data}: { data: PostType }) => {

    const [descrHidden, setDescrHidden] = useState(true)

    return (
        <li className="post">
            <div className="post__top">
                <img draggable={false} loading="lazy" src={data.owner_image} className="post__top-img" />
                <p className="post__top-name" onClick={() => window.location.assign(`/user/${data.owner_id}`)} >{data.user_name}</p>
            </div>
            <div className="post__mid" >
                <img draggable={false} loading="lazy" className="post__mid-img" src={data.file} />
            </div>
            <div className="post__bot">
                <PostPanel data={{commented: data.commented, comments: data.comments, followed: data.followed,
                    likes: data.likes, liked: data.liked, id: data.id, owner_id: data.owner_id }} />
                <p className="post__bot-date" >
                    {data.date.split(" ")[1]}{" "}
                    {data.date.split(" ")[2]}{" "}
                    {data.date.split(" ")[3]}
                </p>
                <div className={`post__bot-data ${descrHidden ? "": "extended"}`}>
                    <ul className="post__bot-data-hashtags">
                        {data.hashtags.map((hashtag, key) => <li key={key} className="post__bot-data-hashtags-item">{hashtag}</li>)}
                    </ul>
                    <p className="post__bot-data-description">{data.description}</p>
                </div>
                <button className="post__bot-btn" onClick={() => setDescrHidden(prev => !prev)}>
                    {descrHidden ? <TriangleDown/> : <TriangleUp/>}</button>
            </div>
        </li>
    )
}

export interface PostType extends PostPanelType {
    date: string
    description: string
    file: string
    hashtags: string[]
    owner_image: string
    user_name: string
}

import {CommentEmpty, CommentFull, EyeEmpty, EyeFull, HeartEmpty, HeartFull} from "../assets/icons";
import {useContext, useReducer} from "react";
import API from "../features/API";

// @ts-ignore
import {NotificationManager} from 'react-notifications'
import {AppContext} from "../context";

export default ({data} : { data: PostPanelType }) => {

    const {state, dispatch} = useContext(AppContext)

    const init = {
        COMMENT: data.comments,
        COMMENTED: data.commented,
        LIKE: data.likes,
        LIKED: data.liked,
        FOLLOWED: data.followed
    }

    const [redcPost, setRedcPost] = useReducer(PostReducer, init)

    const handleCLick = async (action: PostAction) => {
        setRedcPost(action)

        let status: number = 0
        let msg: string = "Connection error, try again later..."
        switch (action.type) {
            case "TOGGLE_LIKED":
                const like = await API("GET", `/api/likes/add/${data.id}`, null, true)
                status = like.status
                msg = like.msg
                break
            case "TOGGLE_FOLLOWED":
                dispatch({type: redcPost.FOLLOWED ? "UNFOLLOW_USER" : "FOLLOW_USER", item: data.owner_id})
                const follow = await API("POST", `/api/followers/add/${data.owner_id}`, null, true)
                status = follow.status
                msg = follow.msg
                if(status !== 200) dispatch({type: redcPost.FOLLOWED ? "FOLLOW_USER" : "UNFOLLOW_USER", item: data.owner_id})

        }

        if(status !== 201) {
            setRedcPost(action)
            NotificationManager.warning(msg, "", 1000)
        }
    }

    return (
        <div className="post__bot-panel">
            <div className="post__bot-panel-like icon" >
                <p onClick={() => handleCLick({type: "TOGGLE_LIKED"})}>
                    {redcPost.LIKED ? <HeartFull/> : <HeartEmpty/>}</p>
                {redcPost.LIKE}
            </div>
            <div className="post__bot-panel-comment icon" >
                <p>
                    {redcPost.COMMENTED ? <CommentFull/> : <CommentEmpty/>}</p>
                {redcPost.COMMENT}
            </div>
            <div className="post__bot-panel-follow icon" >
                <p onClick={() => handleCLick({type: "TOGGLE_FOLLOWED"})}>
                    {redcPost.FOLLOWED ? <EyeFull/> : <EyeEmpty/>}</p>
            </div>
        </div>
    )
}

export interface PostPanelType {
    commented: true
    comments: number
    followed: boolean
    id: number
    liked: boolean
    likes: number
    owner_id: number
}

export function PostReducer (state: PostState, action: PostAction): PostState {
    switch (action.type) {
        case "TOGGLE_FOLLOWED":
            return {...state, FOLLOWED: !state.FOLLOWED }

        case "TOGGLE_LIKED":
            return {...state, LIKED: !state.LIKED, LIKE: state.LIKED ? state.LIKE - 1 : state.LIKE + 1}

        default:
            return state
    }
}

export interface PostState {
    "COMMENT": number,
    "LIKE": number,
    "FOLLOWED": boolean
    "COMMENTED": boolean
    "LIKED": boolean

}

export type PostAction = { type: "TOGGLE_FOLLOWED" } | { type: "TOGGLE_LIKED" }

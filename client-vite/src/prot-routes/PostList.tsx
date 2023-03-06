import {useContext, useEffect} from "react";
import Post, {PostType} from "../components/Post";
import {AppContext} from "../context";

export default ({newURL}: {newURL: string}) => {

    const {state, dispatch} = useContext(AppContext)
    const {POSTS, IS_LOADING} = state

    useEffect(() => {
        dispatch({type: "NEW_URL", item: newURL})
    }, [newURL])

    return (
        <main className="main" >
            {POSTS && (
                <ul className="wrapper">
                    {POSTS.map((item: PostType, key: number) => <Post key={key} data={item}/>)}
                    {IS_LOADING && <li className="post loading" />}
                </ul>)
            }
        </main>
    )
}


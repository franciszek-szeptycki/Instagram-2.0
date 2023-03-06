import {useContext, useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";
import API from "../features/API";
import Post, {PostType} from "../components/Post";
import Loading from "../components/Spinner";
import Spinner from "../components/Spinner";
import SearchEngine from "../components/SearchEngine";
import {AppContext} from "../context";

export default () => {

    // const mainRef: any = useRef(null)
    // const {state, dispatch} = useContext(AppContext)
    // const {PAGE_NR, PAGES_LOADED, IS_LOADING} = state
    //
    // const [posts, setPosts] = useState<PostType[]>([])
    // const [hashtag, setHashtag] = useState<number>()
    // let currentURL = `/api/posts/get/page=${PAGE_NR}`
    //
    // const PostsAPI: any = useQuery("home-posts", () =>
    //     API("GET", currentURL, null), {
    //     onSuccess: (res: {status: number, data: PostType[]}) => {
    //         if(!PAGE_NR) return PostsAPI.refetch()
    //         if(!res.data) return dispatch({type: "SET_LOADING_ON"})
    //
    //         dispatch({type: "RESET_PAGES_INFO"})
    //
    //         if(!posts.length) return setPosts(res.data)
    //         else setPosts(prev => [...prev, ...res.data])
    //
    //         return dispatch({type: "SET_LOADING_OFF"})
    //     }
    // })
    //
    //
    // useEffect(() => {
    //     if (hashtag) currentURL = `/api/posts/hashtags/get/${hashtag}`
    //     else currentURL = `/api/posts/get/page=${PAGE_NR}`
    //     dispatch({type: "RESET_PAGES_INFO"})
    //     setPosts([])
    //     dispatch({type: "SET_LOADING_ON"})
    //     PostsAPI.refetch()
    // }, [hashtag])
    //
    // // REFETCH ON NEW PAGE
    // useEffect(() => {
    //     PostsAPI.refetch()
    // }, [PAGE_NR])
    //
    // const handleScroll = () => {
    //     if(PAGES_LOADED !== PAGE_NR) return
    //
    //     const {scrollTop, clientHeight, scrollHeight} = mainRef.current
    //     if (scrollTop + clientHeight >= scrollHeight) {
    //         dispatch({type: "INCREASE_PAGE_NR"})
    //         dispatch({type: "SET_LOADING_ON"})
    //     }
    // }

    const {state, dispatch} = useContext(AppContext)
    const {POSTS, IS_LOADING} = state

    useEffect(() => {
        dispatch({type: "NEW_URL", item: "/api/posts/get"})
    }, [])

    return (
        // <main ref={mainRef} onScroll={handleScroll} className="main" >
        <main className="main" >
            {/*<SearchEngine setHashtag={setHashtag} />*/}
            {POSTS && (
                <ul className="wrapper">
                    {POSTS.map((item: PostType, key: number) => <Post key={key} data={item}/>)}
                    {IS_LOADING && <li className="post loading" />}
                </ul>)
            }
        </main>
    )
}


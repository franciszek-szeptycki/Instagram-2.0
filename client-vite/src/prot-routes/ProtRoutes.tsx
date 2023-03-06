import Home from "./Home";
import './ProtRoutes.sass'
import Nav from "../components/Nav";
import {Route, Routes} from "react-router-dom";
import User from "./User";
import CreatePost from "./CreatePost";
import Liked from "./Liked";
import {useQuery} from "react-query";
import axios from "axios";
import API from "../features/API";
import {AppContext} from "../context";
import {useContext, useEffect, useRef} from "react";
import {PostType} from "../components/Post";

export default () => {

    const {state, dispatch} = useContext(AppContext)
    const {URL, PAGE_NR, PAGES_LOADED, POSTS} = state

    const PostsAPI: any = useQuery("posts", () => {
        if (URL) return API("GET", URL + `/page=${PAGE_NR}`)
        else return Promise.resolve({status: 599})
    }, {
        refetchOnWindowFocus: false,
        onSuccess: (res: {status: number, data: PostType[]}) => {
            console.log(res.status)
            if (res.status === 599) return
            else if (res.status !== 200) return dispatch({type: "SET_LOADING_OFF"})
            dispatch({type: "ADD_POSTS", item: res.data})
        }
    })

    // DETECT NEW URL
    useEffect(() => {
        PostsAPI.refetch()
    }, [URL])

    // HANDLE SCROLL
    const myRef: any = useRef()
    const handleScroll = () => {
        if(PAGES_LOADED !== PAGE_NR) return
        const {scrollTop, clientHeight, scrollHeight} = myRef.current

        if (scrollTop + (2 * clientHeight) >= scrollHeight) {
            dispatch({type: "INCREASE_PAGE_NR"})
            dispatch({type: "SET_LOADING_ON"})
        }
}

    // SMALL REFETCH
    useEffect(() => {
        PostsAPI.refetch()
    }, [PAGE_NR])

    return (
        <div data-testid="prot-routes" className="prot-routes" ref={myRef} onScroll={handleScroll}>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/user/*" element={<User/>} />
                <Route path="/create-post" element={<CreatePost/>} />
                {/*<Route path="favourites" element={<Liked/>} />*/}
            </Routes>
        </div>
    )
}
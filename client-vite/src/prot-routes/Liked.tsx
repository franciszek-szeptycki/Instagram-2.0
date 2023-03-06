import {useEffect, useRef, useState} from "react";
import {useQuery} from "react-query";
import API from "../features/API";
import Post, {PostType} from "../components/Post";
import Loading from "../components/Spinner";
import Spinner from "../components/Spinner";
import SearchEngine from "../components/SearchEngine";

export default () => {

    const mainRef: any = useRef(null)

    const [posts, setPosts] = useState<PostType[]>([])
    const [pageNr, setPageNr] = useState(1)
    const [pagesLoaded, setPagesLoaded] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [hashtag, setHashtag] = useState<number>()
    let currentURL = `/api/posts/get/page=${pageNr}`

    const PostsAPI = useQuery("home-posts", () =>
        API("GET", currentURL, null), {
        onSuccess: (res: {status: number, data: PostType[]}) => {
            if(!res.data) return setIsLoading(false)


            setPagesLoaded(prev => prev + 1)

            if(!posts.length) return setPosts(res.data)
            else setPosts(prev => [...prev, ...res.data])

            setIsLoading(false)
        }
    })


    useEffect(() => {
        if (hashtag) currentURL = `/api/posts/hashtags/get/${hashtag}`
        else currentURL = `/api/posts/get/page=${pageNr}`
        setPageNr(1)
        setPosts([])
        setIsLoading(true)
        PostsAPI.refetch()
    }, [hashtag])

    // REFETCH ON NEW PAGE
    useEffect(() => {
        PostsAPI.refetch()
    }, [pageNr])

    const handleScroll = () => {
        if(pagesLoaded !== pageNr) return

        const {scrollTop, clientHeight, scrollHeight} = mainRef.current
        if (scrollTop + clientHeight >= scrollHeight) {
            setPageNr(prev => prev + 1)
            setIsLoading(true)
        }
    }

    return (
        <main ref={mainRef} onScroll={handleScroll} className="main" >
            <SearchEngine setHashtag={setHashtag} />
            {posts.length ?<>
                    <ul className="wrapper">
                        {posts.map((item: PostType, key: number) => <Post key={key} data={item}/>)}
                    </ul>
                    <div className="post-footer">
                        {isLoading && <Spinner x={50} y={50}/>}
                    </div>
                </>
                : <Spinner x={50} y={50} />}
        </main>
    )
}


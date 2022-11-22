import { useEffect, useState } from "react";
import RenderPosts from "../../components/render-post/RenderPosts";
import { useQuery } from "react-query";
import reqServer from "../../utils/reqServer";
import LoadingPost from "../../components/render-post/LoadingPost";
import "./Home.sass"

const Home = () => {
    const { isLoading, data } = useQuery("all-posts", () => {
        return reqServer("GET", null, "/api/posts/get/page=1", true);
    });
    // console.log(isLoading)
    return (
        <div className="page page-home">
            <main className="main">
                <div className="main__search">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" className="main__search-input" placeholder="Search..."/>
                </div>
                {isLoading ? <LoadingPost /> : <RenderPosts data={data} />}
            </main>
            <aside className="aside"></aside>
        </div>
    );
};

export default Home;

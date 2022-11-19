import { useEffect, useState } from "react";
import RenderPosts from "../../components/render-post/RenderPosts";
import getHomeContent from "./getHomeContent";
import "./Home.sass";

const Home = () => {
    const [pages, setPages] = useState([]);

    // console.log(pages)

    useEffect(() => {
        getHomeContent(setPages);
    }, []);

    return (
        <div className="home-bg">
            <div className="page page-home">
                <main className="main">
                    <RenderPosts data={pages} />
                </main>
                <aside className="aside"></aside>
            </div>
        </div>
    );
};

export default Home;

import { useEffect, useState } from "react";
import RenderPosts from "../../components/render-post/RenderPosts";
import getHomeContent from "./getHomeContent";

const Home = () => {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        getHomeContent(setPages);
    }, []);

    return (
            <div className="page page-home">
                <main className="main">
                <div className="main__search">
                    <input type="text" className="main__search-input" />
                    </div>
                    <RenderPosts data={pages} />
                </main>
                <aside className="aside"></aside>
            </div>
    );
};

export default Home;

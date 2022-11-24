import { useQuery } from "react-query";
import reqServer from "../../utils/reqServer";
import LoadingPost from "../../components/render-post/LoadingPost";
import RenderPosts from "../../components/render-post/RenderPosts";
import './Following.sass'

const Following = () => {
	const { isLoading, data } = useQuery("following-posts", () => {
        return reqServer("GET", null, "/api/followers/get");
    });
    console.log(!isLoading && data)
    return (
        <div className="page page-following">
            <main className="main">
                {isLoading ? <LoadingPost /> : <RenderPosts data={data} />}
            </main>
            <aside className="aside"></aside>
        </div>
    );
};

export default Following;

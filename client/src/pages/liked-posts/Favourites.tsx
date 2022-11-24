import { useQuery } from "react-query";
import reqServer from "../../utils/reqServer";
import LoadingPost from "../../components/render-post/LoadingPost";
import RenderPosts from "../../components/render-post/RenderPosts";
import './Favourites.sass'

const Favourites = () => {
	const { isLoading, data } = useQuery("favourites-posts", () => {
        return reqServer("GET", null, "/api/likes/get");
    });
    return (
        <div className="page page-favourites">
            <main className="main">
                {isLoading ? <LoadingPost /> : <RenderPosts data={data} />}
            </main>
            <aside className="aside"></aside>
        </div>
    );
};

export default Favourites;

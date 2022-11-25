import { useEffect, useState } from "react";
import RenderPosts from "../../components/render-post/RenderPosts";
import { useQuery } from "react-query";
import reqServer from "../../utils/reqServer";
import LoadingPost from "../../components/render-post/LoadingPost";
import "./Home.sass";
import { useSelector } from "react-redux";
import allReducers from "../../redux/reducers";

const Home = () => {
    const { isLoading, data } = useQuery("all-posts", () => {
        return reqServer("GET", null, "/api/posts/get/page=1");
    });

    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState([]);
    const [isSearchExtended, setIsSearchExtended] = useState(false);

    const isPostDisplayed = useSelector<ReturnType<typeof allReducers>>(
        (state) => state.displayPost.display
    );

    const search = async (arg) => {
        const reqUsers = await reqServer(
            "GET",
            null,
            `/api/search/user/${arg ? arg : "-"}`
        );
        const reqHashtags = await reqServer(
            "GET",
            null,
            `/api/search/hashtag/${arg ? arg : "-"}`
        );

        const users = reqUsers.data || [];
        const hashtags = reqHashtags.data || [];
        const searchResults = [
            users[0],
            users[1],
            users[2],
            hashtags[0],
            hashtags[1],
            hashtags[2],
        ].filter((item) => item && item);
        console.log(searchResults);
        setSearchValue(searchResults);
    };

    const handleSearchInput = (e) => {
        const text = e.target.value;
        if (/[A-Za-z0-1_/-/]$/.test(text) || !text) {
            setInputValue(text);
            search(text);
        }
    };

    document.addEventListener("click", () => {
        if (isSearchExtended) setIsSearchExtended(false);
    });
    const handleInputFocus = (e) => {
        setIsSearchExtended(true);
        if (!e.target.value) setIsSearchExtended(false);
    };

    // console.log(searchValue);

    return (
        <div className="page page-home">
            <main className="main">
                <div className="main__label-wrapper">
                    <div
                        className={`main__label ${
                            isPostDisplayed ? "hidden" : ""
                        }`}
                    >
                        <ul
                            className={`main__label-ul ${
                                isSearchExtended ? "extended" : ""
                            }`}
                        >
                            <li className="main__label-li">
                                <div className="main__search">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    <input
                                        type="text"
                                        className="main__search-input"
                                        placeholder="Search..."
                                        onChange={(e) => {
                                            handleSearchInput(e);
                                            handleInputFocus(e);
                                        }}
                                        value={inputValue}
                                    />
                                </div>
                            </li>
                            {searchValue.map((item) => (
                                <li className="main__label-li" id={item.id}>
                                    {item.user_name || item.hashtag_name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {isLoading ? (
                    <LoadingPost />
                ) : (
                    <RenderPosts reverse={false} data={data} />
                )}
            </main>
        </div>
    );
};

export default Home;

import React from "react";
import { useSelector } from "react-redux";
import Nav from "./layout/Nav";
import CreatePostPanel from "./pages/create-post/CreatePostPanel";
import allReducers from "./redux/reducers";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import MyProfile from "./pages/my-profile/MyProfile";
import UserProfile from "./pages/somebody-profile/UserProfile";
import DisplayPost from "./widgets/display-post/DisplayPost";

const Container = () => {

    const displayPost = useSelector<ReturnType<typeof allReducers>>(state => state.displayPost.display)

    return (
        <div className="container">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/users/*" element={<UserProfile />} />
                <Route path="/create-post" element={<CreatePostPanel />}/>
            </Routes>
            {displayPost && <DisplayPost/>}
        </div>
    );
};

export default Container;

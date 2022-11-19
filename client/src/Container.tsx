import React from "react";
import { useSelector } from "react-redux";
import Nav from "./layout/Nav";
import CreatePostPanel from "./pages/create-post/CreatePostPanel";
import allReducers from "./redux/reducers";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import MyProfile from "./pages/my-profile/MyProfile";
import UserProfile from "./pages/somebody-profile/UserProfile";

const Container = () => {

    return (
        <div className="container">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<MyProfile />} />
                <Route path="/users/*" element={<UserProfile />} />
                <Route path="/create-post" element={<CreatePostPanel />}/>
            </Routes>
        </div>
    );
};

export default Container;

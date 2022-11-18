import React from "react";
import { useSelector } from "react-redux";
import Nav from "./layout/Nav";
import CreatePostPanel from "./pages/create-post/CreatePostPanel";
import allReducers from "./redux/reducers";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/profile/Profile";

const Container = () => {

    return (
        <div className="container">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-post" element={<CreatePostPanel />}/>
            </Routes>
        </div>
    );
};

export default Container;

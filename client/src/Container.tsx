import React from "react";
import { useSelector } from "react-redux";
import Nav from "./layout/Nav";
import CreatePostPanel from "./widgets/create-post/CreatePostPanel";
import allReducers from "./redux/reducers";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

type RootState = ReturnType<typeof allReducers>;

const Container = () => {
    const createPostPanel = useSelector<RootState>(
        (state) => state.createPostPanel
    );

    return (
        <div className="container">
            <Nav />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            {createPostPanel && <CreatePostPanel />}
        </div>
    );
};

export default Container;

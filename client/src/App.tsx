import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./container/Container";
import LoginPanel from "./panel/LoginPanel";
import RegisterPanel from "./panel/RegisterPanel";
import {useSelector} from "react-redux";
import allReducers from "./redux/reducers";
    
type RootState = ReturnType<typeof allReducers>
const App = () => {
    const isLog = useSelector<RootState>((state) => state.isLogged)


    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    {isLog ? (
                        <Route path="/*" element={<Container />} />
                    ) : (
                        <>
                            <Route path="/*" element={<LoginPanel />} />
                            <Route
                                path="/sign-up"
                                element={<RegisterPanel />}
                            />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

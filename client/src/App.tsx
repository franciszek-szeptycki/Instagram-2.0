import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./Container";
import LoginPanel from "./start/LoginPanel";
import RegisterPanel from "./start/RegisterPanel";
import {useSelector} from "react-redux";
import allReducers from "./redux/reducers";
    
type RootState = ReturnType<typeof allReducers>

const App = () => {
    const isUserLogged = useSelector<RootState>((state) => state.isLogged)


    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    {isUserLogged ? (
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

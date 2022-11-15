import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./Container";
import LoginPanel from "./start/Login";
import Register from "./start/Register";
import { useSelector } from "react-redux";
import allReducers from "./redux/reducers";
import { useDispatch } from "react-redux";
import LoadingPage from "./widgets/loading-page/LoadingPage";
import checkTokenValidity from "./utils/checkTokenValidity";
import './App.sass'

type RootState = ReturnType<typeof allReducers>;

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        checkTokenValidity(setIsLoading, dispatch)
    }, [])

    const isUserLogged = useSelector<RootState>((state) => state.isLogged);

    if (isLoading)
        return (
            <div className="app">
                <LoadingPage />
            </div>
        );

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    {isUserLogged ? (
                        <Route path="/*" element={<Container />} />
                    ) : (
                        <>
                            <Route path="/*" element={<LoginPanel />} />
                            <Route path="/sign-up" element={<Register />} />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;

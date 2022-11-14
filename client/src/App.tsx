import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./Container";
import LoginPanel from "./start/Login";
import Register from "./start/Register";
import { useSelector } from "react-redux";
import allReducers from "./redux/reducers";

type RootState = ReturnType<typeof allReducers>;

const App = () => {
    const [isLoading, setIsLoading] = useState(true)

    fetch("/auth/token", {
        method: "POST",
        headers: {
            Authorization: localStorage.getItem("access_token"),
        },
        body: localStorage.getItem("access_token"),
    })
    .then(async (res) => {
        const data = await res.json()
        if (res.status === 200) localStorage.setItem("access_token", data.access_token)
        else localStorage.removeItem("access_token")
    })
    .catch((error) => {
        console.error(error);
    });

    const isUserLogged = useSelector<RootState>((state) => state.isLogged);

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

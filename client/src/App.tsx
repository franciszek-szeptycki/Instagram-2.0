import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./container/Container";
import LoginPanel from "./panel/LoginPanel";
import RegisterPanel from "./panel/RegisterPanel";
import { getToken } from "./utils/JWT";
import { loginWithToken } from "./utils/loginRequests";

const App = () => {
    
    const tokenStatus: any = getToken();
    if (!tokenStatus.isTokenThere) {
        // loginWithToken()
    }

    const isLogged = false

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    {isLogged ? (
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

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./container/Container";
import LoginPanel from "./panel/LoginPanel";
import RegisterPanel from "./panel/RegisterPanel";

const App = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);

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

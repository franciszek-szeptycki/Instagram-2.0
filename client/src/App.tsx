import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from "./Container";
import LoginPanel from "./start/Login";
import Register from "./start/Register";
import { useSelector } from "react-redux";
import allReducers from "./redux/reducers";
import reqServer from "./utils/reqServer";
import { useDispatch } from "react-redux";
import { LOG_IN_FUNCTION, LOG_OUT_FUNCTION } from "./redux/actions/isLogged";
import LoadingPage from "./widgets/loading-page/LoadingPage";

type RootState = ReturnType<typeof allReducers>;

const App = () => {
    // const [isLoading, setIsLoading] = useState(true);

    // const dispatch = useDispatch()
    // const { status } = await reqServer("POST", null, "/auth/access_token")
    // if (status === 200) {
    //     dispatch(LOG_IN_FUNCTION())
    //     setIsLoading(false)
    // }
    // else dispatch(LOG_OUT_FUNCTION())
    
    const isUserLogged = useSelector<RootState>((state) => state.isLogged);
    
    // if (isLoading) return <div className="app"><LoadingPage/></div>;

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

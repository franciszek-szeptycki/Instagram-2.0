import React, {createContext} from "react";
import {ActionType, StateType} from "./reducers";

export const initialState: StateType = {
    USER_LOGGED: false,
    FOLLOWED_USERS: [],
    PAGE_NR: 1,
    PAGES_LOADED: 0,
    IS_LOADING: true,
    URL: "",
    POSTS: []
};


export const AppContext = createContext<{state: StateType, dispatch: React.Dispatch<ActionType>}>({
    state: initialState,
    dispatch: () => initialState
})

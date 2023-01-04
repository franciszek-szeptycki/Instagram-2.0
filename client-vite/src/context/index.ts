import React, {createContext} from "react";
import {ActionType, StateType} from "./reducers";

export const initialState: StateType = {
    USER_LOGGED: false,
    FOLLOWED_USERS: [],
};


export const AppContext = createContext<{state: StateType, dispatch: React.Dispatch<ActionType>}>({
    state: initialState,
    dispatch: () => initialState
})

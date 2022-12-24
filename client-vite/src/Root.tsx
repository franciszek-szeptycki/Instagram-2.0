import {useReducer} from "react";
import {reducer, State} from "./context/reducers";
import {AppContext} from "./context";

export default ({children, initialState = {}}: {children: any, initialState?: State | any}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}} >
            {children}
        </AppContext.Provider>
    )
}
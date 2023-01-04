import {useReducer} from "react";
import {reducer, StateType} from "./context/reducers";
import {AppContext} from "./context";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// @ts-ignore
import {NotificationContainer} from 'react-notifications'
import "react-notifications/lib/notifications.css"
import {QueryClientProvider, QueryClient} from 'react-query'


const client = new QueryClient()

export default ({children, initialState = {}}: {children: any, initialState?: StateType | any}) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch}} >
            <QueryClientProvider client={client}>
                <Router>
                    {children}
                    <NotificationContainer/>
                </Router>
            </QueryClientProvider>
        </AppContext.Provider>
    )
}
import { LOG_IN, LOG_OUT } from "../actions/isLogged";
import { action } from "./index";

const isLogged = (state = false, action: action) => {
    switch (action.type) {
        case LOG_IN:
            return true;
        case LOG_OUT:
            return false;
        default:
            return state;
    }
};

export default isLogged;
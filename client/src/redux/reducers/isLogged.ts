import { LOG_IN, LOG_OUT, action } from "../actions/isLogged";

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
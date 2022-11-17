import isLogged from "./isLogged";
import { combineReducers } from "redux";

export interface action {
	type: string
}

const allReducers = combineReducers({
	isLogged,
});

export default allReducers;

import isLogged from "./isLogged";
import { combineReducers } from "redux";
import addPostPanel from './addPostPanel'

export interface action {
	type: string
}

const allReducers = combineReducers({
	isLogged,
	addPostPanel
});

export default allReducers;

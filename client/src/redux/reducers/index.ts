import isLogged from "./isLogged";
import { combineReducers } from "redux";
import createPostPanel from './createPostPanel'

export interface action {
	type: string
}

const allReducers = combineReducers({
	isLogged,
	createPostPanel
});

export default allReducers;

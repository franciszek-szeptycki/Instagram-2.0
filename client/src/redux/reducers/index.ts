import isLogged from "./isLogged";
import displayPost from "./displayPost";
import { combineReducers } from "redux";

export interface displayPostAction {
	type: string,
	display: boolean,
	postID: string
}

export interface action {
	type: string
}

const allReducers = combineReducers({
	isLogged,
	displayPost,
});

export default allReducers;

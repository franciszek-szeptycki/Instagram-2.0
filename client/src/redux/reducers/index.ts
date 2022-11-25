import isLogged from "./isLogged";
import displayPost from "./displayPost";
import { combineReducers } from "redux";

interface actionWithParameter {
	type: string,
	display: boolean,
}

export interface displayPostAction extends actionWithParameter {
	postID: string
}

export interface searchAction extends actionWithParameter {
	searchID: string
}

export interface action {
	type: string
}

const allReducers = combineReducers({
	isLogged,
	displayPost,
});

export default allReducers;

import { ADD_POST_ON, ADD_POST_OFF } from "../actions/addPostPanel";
import { action } from "./index";

const addPostPanel = (state = false, action: action) => {
	switch (action.type) {
		case ADD_POST_ON:
			return true;
		case ADD_POST_OFF:
			return false;
		default:
			return state;
	}
}

export default addPostPanel
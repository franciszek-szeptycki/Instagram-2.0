import { CREATE_POST_ON, CREATE_POST_OFF } from "../actions/createPostPanel";
import { action } from "./index";

const createPostPanel = (state = false, action: action) => {
	switch (action.type) {
		case CREATE_POST_ON:
			return true;
		case CREATE_POST_OFF:
			return false;
		default:
			return state;
	}
}

export default createPostPanel
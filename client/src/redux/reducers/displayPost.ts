import { SHOW_POST, HIDE_POST } from "../actions/displayPost";
import { displayPostAction } from "./index";

const initialState = {
    display: false,
    postID: "",
};

const displayPost = (state = initialState, action: displayPostAction) => {
    switch (action.type) {
        case SHOW_POST:
            return {
                display: true,
                postID: action.postID,
            };
        case HIDE_POST:
            return {
                display: false,
                postID: "",
            }
        default:
            return state;
    }
};

export default displayPost;

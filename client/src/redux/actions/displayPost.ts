import { type } from "@testing-library/user-event/dist/type";
import { displayPostAction } from "../reducers/index";
export const SHOW_POST = "SHOW_POST";
export const HIDE_POST = "HIDE_POST";

export const SHOW_POST_FUNCTION = (postID: string): displayPostAction => {
    return { type: SHOW_POST, display: true, postID };
};

export const HIDE_POST_FUNCTION = (): displayPostAction => {
    return { type: HIDE_POST, display: false, postID: "" };
};

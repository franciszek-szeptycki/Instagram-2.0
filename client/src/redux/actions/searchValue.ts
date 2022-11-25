import { type } from "@testing-library/user-event/dist/type";
import { searchAction } from "../reducers/index";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const REMOVE_SEARCH_RESULTS = "REMOVE_SEARCH_RESULTS";

export const SET_SEARCH_RESULTS_FUNCTION = (searchID: string): searchAction => {
    return { type: SET_SEARCH_RESULTS, display: true, searchID };
};

export const REMOVE_SEARCH_RESULTS_FUNCTION = (): searchAction => {
    return { type: REMOVE_SEARCH_RESULTS, display: false, searchID: "" };
};

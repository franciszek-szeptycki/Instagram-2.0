import { SET_SEARCH_RESULTS, REMOVE_SEARCH_RESULTS } from "../actions/searchValue";
import { searchAction } from "./index";

const initialState = {
    display: false,
    searchID: "",
};

const search = (state = initialState, action: searchAction) => {
    switch (action.type) {
        case SET_SEARCH_RESULTS:
            return {
                display: true,
                searchID: action.searchID,
            };
        case REMOVE_SEARCH_RESULTS:
            return {
                display: false,
                searchID: "",
            }
        default:
            return state;
    }
};

export default search;

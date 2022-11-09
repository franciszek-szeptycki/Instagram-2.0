import { action } from "../reducers"

export const ADD_POST_ON = "ADD_POST_ON"
export const ADD_POST_OFF = "ADD_POST_OFF"

export const ADD_POST_ON_FUNCTION = (): action => {
	return {type: ADD_POST_ON}
}

export const ADD_POST_OFF_FUNCTION = (): action => {
	return {type: ADD_POST_OFF}
}
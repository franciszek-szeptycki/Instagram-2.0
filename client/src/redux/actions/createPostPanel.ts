import { action } from "../reducers"

export const CREATE_POST_ON = "CREATE_POST_ON"
export const CREATE_POST_OFF = "CREATE_POST_OFF"

export const CREATE_POST_ON_FUNCTION = (): action => {
	return {type: CREATE_POST_ON}
}

export const CREATE_POST_OFF_FUNCTION = (): action => {
	return {type: CREATE_POST_OFF}
}
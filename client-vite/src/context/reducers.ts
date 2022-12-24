export type State = {
    USER_LOGGED: boolean
}

export type ActionTypes = "SET_IS_USER_LOGGED"

export type Action = {type: ActionTypes, item: any}

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_IS_USER_LOGGED":
            return { ...state, USER_LOGGED: action.item}
        default:
            throw new Error()
    }
}
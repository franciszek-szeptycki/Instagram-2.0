export type StateType = {
    USER_LOGGED: boolean
    FOLLOWED_USERS: number[]
}

export type ActionType =
    {type: "SET_USER_LOGGED", item: boolean} | {type: "FOLLOW_USER", item: number} |
    {type: "UNFOLLOW_USER", item: number}

export const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "SET_USER_LOGGED":
            return { ...state, USER_LOGGED: action.item}
        case "FOLLOW_USER":
            if (!state.FOLLOWED_USERS) return {...state, FOLLOWED_USERS: [action.item]}
            else return {...state, FOLLOWED_USERS: [...state.FOLLOWED_USERS, action.item]}
        case "UNFOLLOW_USER":
            return {...state, FOLLOWED_USERS: state.FOLLOWED_USERS.filter(id => id !== action.item)}
        default:
            throw new Error()
    }
}
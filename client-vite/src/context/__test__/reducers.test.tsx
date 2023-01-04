import {expect, it} from "vitest";
import {ActionType, reducer, StateType} from "../reducers";


it("SET_USER_LOGGED true", () => {
    // @ts-ignore
    const state: StateType = {USER_LOGGED: false}
    const action: ActionType = {type: "SET_USER_LOGGED", item: true}
    expect(reducer(state, action)).toEqual({USER_LOGGED: true})
})

it("SET_USER_LOGGED false", () => {
    // @ts-ignore
    const state: StateType = {USER_LOGGED: true}
    const action: ActionType = {type: "SET_USER_LOGGED", item: false}
    expect(reducer(state, action)).toEqual({USER_LOGGED: false})
})

it("FOLLOW_USER", () => {
    // @ts-ignore
    const state: StateType = {FOLLOWED_USERS: [1, 2, 3]}
    const action: ActionType = {type: "FOLLOW_USER", item: 5}
    expect(reducer(state, action)).toEqual({FOLLOWED_USERS: [1, 2, 3, 5]})
})

it("UNFOLLOW_USER", () => {
    // @ts-ignore
    const state: StateType = {FOLLOWED_USERS: [1, 2, 3]}
    const action: ActionType = {type: "UNFOLLOW_USER", item: 2}
    expect(reducer(state, action)).toEqual({FOLLOWED_USERS: [1, 3]})
})
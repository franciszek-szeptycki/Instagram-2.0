import {useState} from "react";
import {PostType} from "../components/Post";

export type StateType = {
    USER_LOGGED: boolean
    FOLLOWED_USERS: number[]
    PAGE_NR: number
    PAGES_LOADED: number
    IS_LOADING: boolean
    URL: string
    POSTS: PostType[]
}

export type ActionType =
    // LOGIN STATE
    {type: "SET_USER_LOGGED", item: boolean} |
    // FOLLOWING USER
    {type: "FOLLOW_USER", item: number} | {type: "UNFOLLOW_USER", item: number} |
    // PAGINATION
    {type: "INCREASE_PAGE_NR"} | {type: "INCREASE_PAGES_LOADED"} |
    // LOADING
    {type: "SET_LOADING_ON"} | {type: "SET_LOADING_OFF"} |
    // POSTS
    {type: "ADD_POSTS", item: PostType[]} |
    // URL
    {type: "SET_URL", item: string} |
    // RESET POSTS
    {type: "NEW_URL", item: string}


export const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case "SET_USER_LOGGED":
            return { ...state, USER_LOGGED: action.item}

        case "FOLLOW_USER":
            if (!state.FOLLOWED_USERS) return {...state, FOLLOWED_USERS: [action.item]}
            else return {...state, FOLLOWED_USERS: [...state.FOLLOWED_USERS, action.item]}
        case "UNFOLLOW_USER":
            return {...state, FOLLOWED_USERS: state.FOLLOWED_USERS.filter(id => id !== action.item)}

        case "INCREASE_PAGE_NR":
            return {...state, PAGE_NR: state.PAGE_NR + 1}

        case "SET_LOADING_ON":
            return {...state, IS_LOADING: true}
        case "SET_LOADING_OFF":
            return {...state, IS_LOADING: false}

        case "ADD_POSTS":
            return {...state, POSTS: [...state.POSTS, ...action.item], IS_LOADING: false, PAGES_LOADED: state.PAGES_LOADED + 1}

        case "SET_URL":
            return {...state, URL: action.item}
        case "NEW_URL":
            return {...state, POSTS: [], URL: action.item, PAGE_NR: 1, PAGES_LOADED: 0, IS_LOADING: true}
        default:
            throw new Error()
    }
}
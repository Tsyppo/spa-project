export interface User {
    id: string
    login: string
    password: string
    email: string
}

export interface UserState {
    users: any
    currentUser: User | null
    loading: boolean
    error: string | null
}

export enum UserActionType {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    LOGIN_REQUEST = 'LOGIN_REQUEST',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE',
    LOGOUT = 'LOGOUT',
}

export interface SetCurrentUserAction {
    type: UserActionType.SET_CURRENT_USER
    payload: User | null
}

export interface LoginRequestAction {
    type: UserActionType.LOGIN_REQUEST
}

export interface LoginSuccessAction {
    type: UserActionType.LOGIN_SUCCESS
    payload: User
}

export interface LoginFailureAction {
    type: UserActionType.LOGIN_FAILURE
    payload: string // описание ошибки
}

export interface LogoutAction {
    type: UserActionType.LOGOUT
}

export type UserAction =
    | SetCurrentUserAction
    | LoginRequestAction
    | LoginSuccessAction
    | LoginFailureAction
    | LogoutAction

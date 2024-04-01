export interface Photo {
    id: string
    title: string
    description: string
    imageUrl: string
    liked: boolean
}

export interface PhotoState {
    photos: Photo[]
    searchTerm: string
    photosLoaded: boolean
}

export enum PhotoActionType {
    ADD_PHOTO = 'ADD_PHOTO',
    REMOVE_PHOTO = 'REMOVE_PHOTO',
    TOGGLE_LIKE = 'TOGGLE_LIKE',
    SET_SEARCH_TERM = 'SET_SEARCH_TERM',
    FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS',
}

export interface AddPhotoAction {
    type: PhotoActionType.ADD_PHOTO
    payload: Photo
}

export interface RemovePhotoAction {
    type: PhotoActionType.REMOVE_PHOTO
    payload: string
}

export interface ToggleLikeAction {
    type: PhotoActionType.TOGGLE_LIKE
    payload: string
}

export interface SetSearchTermAction {
    type: PhotoActionType.SET_SEARCH_TERM
    payload: string
}

export interface FetchPhotosSuccessAction {
    type: PhotoActionType.FETCH_PHOTOS_SUCCESS
    payload: Photo[]
}

export type PhotoAction =
    | AddPhotoAction
    | RemovePhotoAction
    | ToggleLikeAction
    | SetSearchTermAction
    | FetchPhotosSuccessAction
